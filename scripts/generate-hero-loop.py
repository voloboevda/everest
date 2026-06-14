#!/usr/bin/env python3
"""Hero loop v2: ship 100% static, planet scrolls, beam shimmer only."""

from __future__ import annotations

import math
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets/img/hero-ship-full-desktop.jpg"
OUT_DIR = ROOT / "assets/video"
TMP_DIR = OUT_DIR / "_frames"

FPS = 30
DURATION = 12
OUT_W, OUT_H = 1920, 1080
HORIZON_Y = int(OUT_H * 0.54)
EARTH_LOOP_PX = 200
BEAM_SHIMMER = 0.12


def load_base() -> Image.Image:
    return Image.open(SRC).convert("RGB").resize((OUT_W, OUT_H), Image.LANCZOS)


def build_earth_strip(base: Image.Image) -> Image.Image:
    """Wider earth strip for seamless horizontal loop."""
    w, h = base.size
    pad = 220
    y0 = HORIZON_Y - 32
    strip = base.crop((0, y0, w, h))
    sw, sh = strip.size
    extended = Image.new("RGB", (sw + pad * 2, sh))
    extended.paste(strip.crop((sw - pad, 0, sw, sh)), (0, 0))
    extended.paste(strip, (pad, 0))
    extended.paste(strip.crop((0, 0, pad, sh)), (pad + sw, 0))
    return extended


def build_static_mask(base: Image.Image) -> Image.Image:
    """Pixels that never move: sky + ship + beam silhouette."""
    w, h = base.size
    gray = base.convert("L")

    mask = Image.new("L", (w, h), 0)
    mask.paste(255, (0, 0, w, HORIZON_Y - 48))

    luma = gray.point(lambda p: 255 if p > 8 else 0)
    center = Image.new("L", (w, h), 0)
    center.paste(255, (int(w * 0.16), 0, int(w * 0.90), h))
    ship = ImageChops.multiply(luma, center)

    beam = Image.new("L", (w, h), 0)
    cx = int(w * 0.515)
    hw = int(w * 0.07)
    beam.paste(255, (cx - hw, 0, cx + hw, int(h * 0.92)))
    ship = ImageChops.lighter(ship, beam)

    mask = ImageChops.lighter(mask, ship)
    return mask.filter(ImageFilter.GaussianBlur(radius=1))


def scrolled_earth(earth_strip: Image.Image, offset: int) -> Image.Image:
    w = OUT_W
    pad = 220
    return earth_strip.crop((pad + offset, 0, pad + offset + w, earth_strip.size[1]))


def apply_beam_shimmer(frame: Image.Image, phase: float) -> Image.Image:
    w, h = frame.size
    cx = int(w * 0.515)
    hw = int(w * 0.035)
    shimmer = 1.0 + BEAM_SHIMMER * math.sin(phase * 6.0) + 0.05 * math.sin(phase * 13.0)
    x1, x2 = cx - hw, cx + hw
    beam = frame.crop((x1, 0, x2, h))
    beam = ImageEnhance.Brightness(beam).enhance(shimmer)
    out = frame.copy()
    out.paste(beam, (x1, 0))
    return out


def compose_frame(
    base: Image.Image,
    earth_strip: Image.Image,
    static_mask: Image.Image,
    phase: float,
    frame_i: int,
    total_frames: int,
) -> Image.Image:
    offset = int((frame_i / total_frames) * EARTH_LOOP_PX)
    earth = scrolled_earth(earth_strip, offset)

    bg = base.copy()
    y0 = HORIZON_Y - 32
    bg.paste(earth, (0, y0))

    frame = Image.composite(base, bg, static_mask)
    return apply_beam_shimmer(frame, phase)


def encode_video(out_mp4: Path, out_webm: Path) -> None:
    mp4_cmd = [
        "ffmpeg", "-y", "-framerate", str(FPS),
        "-i", str(TMP_DIR / "frame_%05d.png"),
        "-c:v", "libx264", "-pix_fmt", "yuv420p",
        "-crf", "18", "-preset", "medium", "-movflags", "+faststart",
        str(out_mp4),
    ]
    subprocess.run(mp4_cmd, check=True)

    webm_cmd = [
        "ffmpeg", "-y", "-i", str(out_mp4),
        "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32", "-row-mt", "1",
        str(out_webm),
    ]
    subprocess.run(webm_cmd, check=True)


def main() -> int:
    if not SRC.exists():
        print(f"Missing source image: {SRC}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)

    base = load_base()
    earth_strip = build_earth_strip(base)
    static_mask = build_static_mask(base)
    total_frames = FPS * DURATION

    print(f"Rendering {total_frames} frames — static ship, scrolling earth...")
    for i in range(total_frames):
        phase = 2.0 * math.pi * i / total_frames
        frame = compose_frame(base, earth_strip, static_mask, phase, i, total_frames)
        frame.save(TMP_DIR / f"frame_{i:05d}.png", optimize=True)
        if i % 60 == 0:
            print(f"  {i}/{total_frames}")

    out_mp4 = OUT_DIR / "hero-ship-loop.mp4"
    out_webm = OUT_DIR / "hero-ship-loop.webm"
    print("Encoding...")
    encode_video(out_mp4, out_webm)

    for f in TMP_DIR.glob("frame_*.png"):
        f.unlink()
    TMP_DIR.rmdir()

    print(f"Done: {out_mp4}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
