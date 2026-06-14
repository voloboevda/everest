#!/usr/bin/env python3
"""Upscale hero with Real-ESRGAN (4x) and export responsive JPEG set."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets/img/hero-ship-source.png"
OUT = ROOT / "assets/img"
TOOL = ROOT / "tools/realesrgan/realesrgan-ncnn-vulkan"
TMP_IN = ROOT / "tools/realesrgan/hero-in.png"
TMP_OUT = ROOT / "tools/realesrgan/hero-out.png"

WIDTHS = {
    "hero-ship-full.jpg": 3840,
    "hero-ship-full-desktop.jpg": 3840,
    "hero-ship-full-tablet.jpg": 2560,
    "hero-ship-full-mobile.jpg": 1920,
    "hero-ship-full.png": 3840,
}


def run_realesrgan(src: Path) -> Image.Image:
    img = Image.open(src).convert("RGB")
    img.save(TMP_IN, "PNG")
    if not TOOL.exists():
        raise SystemExit(f"Missing {TOOL} — download Real-ESRGAN ncnn binary first.")

    subprocess.run(
        [
            str(TOOL),
            "-i",
            str(TMP_IN),
            "-o",
            str(TMP_OUT),
            "-n",
            "realesrgan-x4plus",
            "-s",
            "4",
            "-f",
            "png",
        ],
        check=True,
    )
    return Image.open(TMP_OUT).convert("RGB")


def save_scaled(img: Image.Image, path: Path, target_w: int, quality: int) -> None:
    w, h = img.size
    if w != target_w:
        nh = int(h * (target_w / w))
        img = img.resize((target_w, nh), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")

    print(f"source {Image.open(SRC).size}")
    upscaled = run_realesrgan(SRC)
    print(f"upscaled {upscaled.size}")

    qualities = {
        "hero-ship-full.jpg": 93,
        "hero-ship-full-desktop.jpg": 93,
        "hero-ship-full-tablet.jpg": 92,
        "hero-ship-full-mobile.jpg": 91,
        "hero-ship-full.png": 95,
    }
    for name, width in WIDTHS.items():
        path = OUT / name
        save_scaled(upscaled, path, width, qualities[name])
        print("wrote", path, path.stat().st_size)


if __name__ == "__main__":
    main()
