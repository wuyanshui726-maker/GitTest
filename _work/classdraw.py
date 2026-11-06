import math
from umlcore import INK, BLUE_HDR

HDR = 46
LH = 27


def class_box(f, x, y, w, name, attrs, ops=None, stereo=None, ref=False):
    hd = 60 if stereo else HDR
    ah = 14 + LH * len(attrs) + 8 if attrs else 14
    oh = 14 + LH * len(ops) + 8 if ops else 0
    h = hd + ah + oh
    fill = (253, 253, 253) if not ref else (250, 250, 250)
    hdr = (219, 232, 242) if not ref else (236, 238, 240)
    f.rect(x, y, w, h, fill=fill, outline=(80, 95, 110), width=1.6)
    f.rect(x, y, w, hd, fill=hdr, outline=(80, 95, 110), width=1.6)
    if stereo:
        f.text((x + w / 2, y + 18), stereo, 16, fill=(70, 80, 90))
        f.text((x + w / 2, y + 41), name, 21, bold=True, fill=(30, 45, 60))
    else:
        f.text((x + w / 2, y + hd / 2), name, 21, bold=True, fill=(30, 45, 60))
    yy = y + hd + 14
    f.line([(x, y + hd), (x + w, y + hd)], 1.6, fill=(80, 95, 110))
    for a in attrs:
        f.text((x + 12, yy + LH / 2 - 3), a, 19, anchor="lm", fill=(40, 50, 60))
        yy += LH
    if ops:
        f.line([(x, y + hd + ah), (x + w, y + hd + ah)], 1.6, fill=(80, 95, 110))
        yy = y + hd + ah + 14
        for o in ops:
            f.text((x + 12, yy + LH / 2 - 3), o, 19, anchor="lm", fill=(40, 50, 60))
            yy += LH
    return (x, y, w, h)


def _unit(p, q):
    dx, dy = q[0] - p[0], q[1] - p[1]
    L = math.hypot(dx, dy) or 1
    return dx / L, dy / L


def _edge(box, toward):
    x, y, w, h = box
    cx, cy = x + w / 2, y + h / 2
    dx, dy = toward[0] - cx, toward[1] - cy
    if dx == 0 and dy == 0:
        return (cx, cy)
    tx = (w / 2) / abs(dx) if dx else 1e9
    ty = (h / 2) / abs(dy) if dy else 1e9
    t = min(tx, ty)
    return (cx + dx * t, cy + dy * t)


def connect(f, A, B, kind="assoc", ma=None, mb=None, route=None, role=None, role_pos=None,
            dash=(9, 6)):
    """A to B. comp/aggr diamond at A; inherit triangle at B; depend dashed open arrow at B."""
    if route:
        sp = _edge(A, route[0])
        ep = _edge(B, route[-1])
        mid = list(route)
    else:
        ca = (A[0] + A[2] / 2, A[1] + A[3] / 2)
        cb = (B[0] + B[2] / 2, B[1] + B[3] / 2)
        sp = _edge(A, cb)
        ep = _edge(B, ca)
        mid = []
    pts = [sp] + mid + [ep]

    # decoration trimming
    u = _unit(pts[0], pts[1])
    if kind in ("comp", "aggr"):
        f.diamond(pts[0], pts[1], size=16, filled=(kind == "comp"))
        pts[0] = (pts[0][0] + u[0] * 16, pts[0][1] + u[1] * 16)
    if kind == "inherit":
        u2 = _unit(pts[-2], pts[-1])
        f.hollow_triangle(pts[-1], pts[-2], size=16)
        pts[-1] = (pts[-1][0] - u2[0] * 16, pts[-1][1] - u2[1] * 16)

    if kind == "depend":
        f.line(pts, 1.7, dash=dash)
        f.arrow(pts[-1], pts[-2], size=12, filled=False)
    else:
        f.line(pts, 1.7)
        if kind == "directed":
            f.arrow(pts[-1], pts[-2], size=12, filled=False)

    return pts


def mult(f, end, other, text, off=(0, 0)):
    u = _unit(end, other)
    px, py = -u[1], u[0]
    p = (end[0] + u[0] * 20 + px * 16 + off[0], end[1] + u[1] * 20 + py * 16 + off[1])
    f.text(p, text, 18, fill=(30, 30, 30))


def mult_at(f, pos, text, anchor="mm"):
    f.text(pos, text, 18, fill=(30, 30, 30), anchor=anchor)


def role(f, p, text, anchor="mm"):
    f.text(p, text, 16, fill=(70, 80, 90), anchor=anchor)
