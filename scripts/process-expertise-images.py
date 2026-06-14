#!/usr/bin/env python3
"""Remove opaque dark backgrounds from expertise illustrations (match RGBA PNGs)."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
EXPERTISE_DIR = ROOT / "assets" / "img" / "expertise"
TARGETS = ("exp-finance.png", "exp-deal.png", "exp-analytics.png")


def remove_dark_background(im: Image.Image, tol: int = 35) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    bg = px[0, 0][:3]

    def similar(rgb: tuple[int, int, int]) -> bool:
        return sum(abs(rgb[i] - bg[i]) for i in range(3)) <= tol

    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if similar(px[x, y][:3]):
                visited[y][x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y][x] and similar(px[x, y][:3]):
                visited[y][x] = True
                q.append((x, y))

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and similar(px[nx, ny][:3]):
                visited[ny][nx] = True
                q.append((nx, ny))

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            mx = max(r, g, b)
            if mx <= 28:
                px[x, y] = (0, 0, 0, 0)
            elif mx <= 45:
                px[x, y] = (r, g, b, min(a, (mx - 28) * 12))

    return im


def main() -> None:
    for name in TARGETS:
        path = EXPERTISE_DIR / name
        out = remove_dark_background(Image.open(path))
        out.save(path, optimize=True)
        alpha = out.split()[3].histogram()[0]
        total = out.size[0] * out.size[1]
        print(f"{name}: saved RGBA PNG, {100 * alpha / total:.1f}% transparent")


if __name__ == "__main__":
    main()
