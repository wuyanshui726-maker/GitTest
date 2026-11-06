import math
from PIL import Image, ImageDraw, ImageFont

SS = 2  # supersampling factor
F_BODY = r"C:\Windows\Fonts\msyh.ttc"
F_BOLD = r"C:\Windows\Fonts\msyhbd.ttc"

_fonts = {}


def F(size, bold=False):
    key = (size, bold)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(F_BOLD if bold else F_BODY, size * SS)
    return _fonts[key]


def text_w(s, size, bold=False):
    return F(size, bold).getlength(s) / SS


INK = (55, 65, 75)
BLUE_HDR = (219, 232, 242)
ELL_FILL = (255, 253, 244)
BOUND_FILL = (250, 251, 252)


class Fig:
    def __init__(self, w, h):
        self.W, self.H = w, h
        self.img = Image.new("RGB", (w * SS, h * SS), "white")
        self.d = ImageDraw.Draw(self.img)

    # ---------- primitives ----------
    def _pts(self, pts):
        return [(x * SS, y * SS) for x, y in pts]

    def line(self, pts, width=2, fill=INK, dash=None):
        P = self._pts(pts)
        if not dash:
            self.d.line(P, fill=fill, width=int(width * SS), joint="curve")
        else:
            on, off = dash
            for i in range(len(P) - 1):
                self._dash_seg(P[i], P[i + 1], on * SS, off * SS, int(width * SS), fill)

    def _dash_seg(self, p, q, on, off, w, fill):
        dx, dy = q[0] - p[0], q[1] - p[1]
        L = math.hypot(dx, dy)
        if L == 0:
            return
        ux, uy = dx / L, dy / L
        t = 0
        while t < L:
            e = min(t + on, L)
            self.d.line([(p[0] + ux * t, p[1] + uy * t), (p[0] + ux * e, p[1] + uy * e)], fill=fill, width=w)
            t = e + off

    def text(self, xy, s, size=20, bold=False, fill=INK, anchor="mm"):
        self.d.text((xy[0] * SS, xy[1] * SS), s, font=F(size, bold), fill=fill, anchor=anchor)

    def text_lines(self, cx, cy, lines, size=20, bold=False, fill=INK, spacing=6):
        n = len(lines)
        lh = size
        total = n * lh + (n - 1) * spacing
        y = cy - total / 2 + lh / 2
        for s in lines:
            self.text((cx, y), s, size, bold, fill)
            y += lh + spacing

    def rect(self, x, y, w, h, fill=None, outline=INK, width=2):
        self.d.rectangle(self._pts([(x, y), (x + w, y + h)]), fill=fill, outline=outline, width=int(width * SS))

    def rrect(self, x, y, w, h, r=10, fill=None, outline=INK, width=2):
        self.d.rounded_rectangle(self._pts([(x, y), (x + w, y + h)]), radius=r * SS, fill=fill, outline=outline, width=int(width * SS))

    def ellipse(self, cx, cy, rx, ry, fill=ELL_FILL, outline=INK, width=2):
        self.d.ellipse(self._pts([(cx - rx, cy - ry), (cx + rx, cy + ry)]), fill=fill, outline=outline, width=int(width * SS))

    def arrow(self, tip, prev, size=13, filled=True, fill=INK, width=2):
        """arrow head at tip, coming from prev"""
        dx, dy = tip[0] - prev[0], tip[1] - prev[1]
        L = math.hypot(dx, dy)
        if L == 0:
            return
        ux, uy = dx / L, dy / L
        px, py = -uy, ux
        base = (tip[0] - ux * size, tip[1] - uy * size)
        w2 = size * 0.42
        p1 = (base[0] + px * w2, base[1] + py * w2)
        p2 = (base[0] - px * w2, base[1] - py * w2)
        tri = self._pts([tip, p1, p2])
        if filled:
            self.d.polygon(tri, fill=fill)
        else:
            self.d.polygon(tri, fill="white", outline=fill, width=int(width * SS))
        return base

    def hollow_triangle(self, tip, prev, size=18, fill=INK, width=2):
        dx, dy = tip[0] - prev[0], tip[1] - prev[1]
        L = math.hypot(dx, dy)
        if L == 0:
            return
        ux, uy = dx / L, dy / L
        px, py = -uy, ux
        base = (tip[0] - ux * size, tip[1] - uy * size)
        w2 = size * 0.58
        p1 = (base[0] + px * w2, base[1] + py * w2)
        p2 = (base[0] - px * w2, base[1] - py * w2)
        self.d.polygon(self._pts([tip, p1, p2]), fill="white", outline=fill, width=int(width * SS))
        return base

    def diamond(self, tip, toward, size=18, filled=True, fill=INK, width=2):
        """diamond sitting at 'tip' pointing along direction tip->toward"""
        dx, dy = toward[0] - tip[0], toward[1] - tip[1]
        L = math.hypot(dx, dy)
        if L == 0:
            return tip
        ux, uy = dx / L, dy / L
        px, py = -uy, ux
        m = (tip[0] + ux * size / 2, tip[1] + uy * size / 2)
        p1 = (m[0] + px * size * 0.34, m[1] + py * size * 0.34)
        p2 = (m[0] - px * size * 0.34, m[1] - py * size * 0.34)
        pts = self._pts([tip, p1, (tip[0] + ux * size, tip[1] + uy * size), p2])
        if filled:
            self.d.polygon(pts, fill=fill)
        else:
            self.d.polygon(pts, fill="white", outline=fill, width=int(width * SS))
        return (tip[0] + ux * size, tip[1] + uy * size)

    # ---------- composite ----------
    def actor(self, cx, top, label, label_size=24, figure_h=96):
        head_r = 12
        cy = top + head_r
        self.d.ellipse(self._pts([(cx - head_r, cy - head_r), (cx + head_r, cy + head_r)]), outline=INK, width=2 * SS)
        neck = top + 2 * head_r
        hip = neck + 34
        self.line([(cx, neck), (cx, hip)], 2)
        self.line([(cx - 24, neck + 18), (cx + 24, neck + 18)], 2)
        self.line([(cx, hip), (cx - 20, hip + 32)], 2)
        self.line([(cx, hip), (cx + 20, hip + 32)], 2)
        self.text((cx, hip + 32 + 30), label, label_size, bold=True, anchor="mm")

    def note(self, x, y, w, h, lines, size=18):
        fold = 18
        pts = self._pts([(x, y), (x + w - fold, y), (x + w, y + fold), (x + w, y + h), (x, y + h)])
        self.d.polygon(pts, fill=(255, 255, 235), outline=(140, 140, 90), width=2 * SS)
        self.d.line(self._pts([(x + w - fold, y), (x + w - fold, y + fold), (x + w, y + fold)]), fill=(140, 140, 90), width=2 * SS)
        yy = y + 16
        for s in lines:
            self.text((x + 10, yy), s, size, anchor="lm")
            yy += size + 8

    def save(self, path):
        out = self.img.resize((self.W, self.H), Image.LANCZOS)
        out.save(path, dpi=(220, 220))
        return path


# ---------- geometry helpers ----------
def box_edge(box, toward):
    """intersection of segment center->toward with box border"""
    x, y, w, h = box
    cx, cy = x + w / 2, y + h / 2
    dx, dy = toward[0] - cx, toward[1] - cy
    if dx == 0 and dy == 0:
        return (cx, cy)
    tx = (w / 2) / abs(dx) if dx else float("inf")
    ty = (h / 2) / abs(dy) if dy else float("inf")
    t = min(tx, ty)
    return (cx + dx * t, cy + dy * t)


def ellipse_edge(cx, cy, rx, ry, toward):
    dx, dy = toward[0] - cx, toward[1] - cy
    if dx == 0 and dy == 0:
        return (cx, cy)
    denom = math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2)
    return (cx + dx / denom, cy + dy / denom)


def polyline_edge(box, pts, at_start=True):
    """edge point of box along polyline; if at_start, first external point is pts[1]"""
    cx, cy = box[0] + box[2] / 2, box[1] + box[3] / 2
    if at_start:
        toward = pts[1]
        # extend direction beyond first point for a clean hit
        dx, dy = toward[0] - cx, toward[1] - cy
        return box_edge(box, (cx + dx * 2, cy + dy * 2))
    else:
        toward = pts[-2]
        dx, dy = toward[0] - cx, toward[1] - cy
        return box_edge(box, (cx + dx * 2, cy + dy * 2))


def seg_angle(p, q):
    return math.atan2(q[1] - p[1], q[0] - p[0])
