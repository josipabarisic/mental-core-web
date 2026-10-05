"""Open Sauce maps both U+0110 (Đ) and U+0111 (đ) to the capital Dcroat glyph.

Build a real lowercase dcroat from d plus a bar through the right stem,
using the standard glyph name so Next.js subsetting keeps the mapping.
"""

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


def add_stem_bar(font, dest_name):
    glyph_set = font.getGlyphSet()
    bounds = BoundsPen(glyph_set)
    glyph_set[dest_name].draw(bounds)
    xmin, ymin, xmax, ymax = bounds.bounds
    width = xmax - xmin
    height = ymax - ymin

    # Lowercase d has its stem on the right. Croatian đ crosses that
    # ascender, not the bowl (a left-side bar reads as a small Đ).
    pad = width * 0.08
    bar_x0 = xmax - width * 0.20 - pad
    bar_x1 = xmax + pad
    bar_h = max(40, height * 0.075)
    bar_y = ymin + height * 0.78

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
    dest = "dcroat"
    d_name = glyph_name(font, 0x64)

    if dest in font["glyf"]:
        del font["glyf"][dest]
    if dest in font["hmtx"].metrics:
        del font["hmtx"].metrics[dest]
    order = font.getGlyphOrder()
    if dest in order:
        font.setGlyphOrder([name for name in order if name != dest])

    font["glyf"][dest] = decompose(font, d_name)
    font["hmtx"][dest] = font["hmtx"][d_name]
    add_stem_bar(font, dest)

    if dest not in font.getGlyphOrder():
        font.setGlyphOrder(font.getGlyphOrder() + [dest])

    for table in font["cmap"].tables:
        if table.isUnicode():
            table.cmap[0x0111] = dest

    if "dcroat.alt" in font["glyf"] and dest != "dcroat.alt":
        del font["glyf"]["dcroat.alt"]
        font["hmtx"].metrics.pop("dcroat.alt", None)
        font.setGlyphOrder([n for n in font.getGlyphOrder() if n != "dcroat.alt"])

    font.save(path)
    check = TTFont(path)
    cmap = check.getBestCmap()
    assert cmap[0x0111] == dest, cmap[0x0111]
    assert cmap[0x0110] == "Dcroat", cmap[0x0110]
    assert cmap[0x0111] != cmap[0x0110]
    print(path.name, "đ ->", cmap[0x0111], "Đ ->", cmap[0x0110])


if __name__ == "__main__":
    for name in (
        "OpenSauceOne-Regular.ttf",
        "OpenSauceOne-Medium.ttf",
        "OpenSauceOne-Bold.ttf",
    ):
        patch(FONTS / name)
