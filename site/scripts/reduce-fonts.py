"""Make the web fonts lighter (M00-04, specs/07). Reads brand/fonts/*.woff2 (frozen, owned by M01), writes site/src/assets/fonts/.

Newsreader is a variable font with weight 200-800 and optical size 6-72. The site uses it for body text only
(headings are Schibsted Grotesk), at weights 300-600 (italic 300-500) and about 19 px, so:
  - weight is limited to the range the site declares,
  - optical size is fixed at 18 (the font's default).
Schibsted Grotesk is limited to weight 400-800 (declared in brand/fonts/fonts.css).

Needs: pip install fonttools brotli.   Run from site/:  python3 scripts/reduce-fonts.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "brand" / "fonts"
OUT = ROOT / "site" / "src" / "assets" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

LIMITS = {
    "Newsreader-normal": {"wght": (300, 600), "opsz": 18},
    "Newsreader-italic": {"wght": (300, 500), "opsz": 18},
    "SchibstedGrotesk-normal": {"wght": (400, 800)},
}

for path in sorted(SRC.glob("*.woff2")):
    family = "-".join(path.stem.split("-")[:2])  # e.g. Newsreader-italic
    font = TTFont(path)
    reduced = instancer.instantiateVariableFont(font, LIMITS[family])
    reduced.flavor = "woff2"
    target = OUT / path.name
    reduced.save(target)
    print(f"{path.name}: {path.stat().st_size:>7} -> {target.stat().st_size:>7} bytes")
