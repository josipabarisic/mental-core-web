"""Open Sauce maps U+0111 (đ) to the capital Đ glyph. Build a real lowercase đ."""

from pathlib import Path
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

FONTS = Path(__file__).resolve().parents[1] / "src" / "fonts"


def glyph_name(font, codepoint):
    return font.getBestCmap()[codepoint]


def decompose(font, source_name):
    glyph_set = font.getGlyphSet()
    pen = TTGlyphPen(glyph_set)
    glyph_set[source_name].draw(pen)
    return pen.glyph()


def add_bar(font, dest_name):
    glyph_set = font.getGlyphSet()
    bounds = BoundsPen(glyph_set)
    glyph_set[dest_name].draw(bounds)
    xmin, ymin, xmax, ymax = bounds.bounds
    width = xmax - xmin
    height = ymax - ymin
    bar_y = ymin + height * 0.72
    bar_h = max(40, height * 0.075)
    bar_x0 = xmin - width * 0.08
    bar_x1 = xmin + width * 0.42
    pen = TTGlyphPen(glyph_set)
    glyph_set[dest_name].draw(pen)
    pen.moveTo((bar_x0, bar_y))
    pen.lineTo((bar_x1, bar_y))
    pen.lineTo((bar_x1, bar_y + bar_h))
    pen.lineTo((bar_x0, bar_y + bar_h))
    pen.closePath()
    font["glyf"][dest_name] = pen.glyph()


def patch(path: Path):
    font = TTFont(path)
    dest = "dcroat.alt"
    font["glyf"][dest] = decompose(font, glyph_name(font, 0x64))
    font["hmtx"][dest] = font["hmtx"][glyph_name(font, 0x64)]
    add_bar(font, dest)
    for table in font["cmap"].tables:
        if table.isUnicode():
            table.cmap[0x0111] = dest
    font.save(path)
    check = TTFont(path)
    print(path.name, "đ ->", check.getBestCmap()[0x0111], "Đ ->", check.getBestCmap()[0x0110])


if __name__ == "__main__":
    for name in (
        "OpenSauceOne-Regular.ttf",
        "OpenSauceOne-Medium.ttf",
        "OpenSauceOne-Bold.ttf",
    ):
        patch(FONTS / name)
