import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from umlcore import Fig, ellipse_edge

W, H = 2000, 1260
f = Fig(W, H)

BX, BY, BW, BH = 180, 70, 1620, 1120
f.rrect(BX, BY, BW, BH, r=16, fill=(250, 251, 252), outline=(120, 130, 145), width=2)
f.text((BX + BW / 2, BY + 34), "电子商务网站系统", 30, bold=True, fill=(40, 60, 90))

RX, RY = 115, 41
use_cases = {}


def uc(cx, cy, text, font=24):
    f.ellipse(cx, cy, RX, RY)
    f.text((cx, cy), text, font, fill=(35, 45, 55))
    use_cases[text] = (cx, cy)
    return (cx, cy)


uc(450, 160, "浏览商品")
uc(450, 280, "搜索商品")
uc(450, 400, "注册")
uc(450, 520, "登录")
uc(450, 640, "商品比价")
uc(450, 760, "管理购物车")

uc(800, 660, "使用优惠券")
uc(800, 780, "提交订单")
uc(800, 900, "支付")
uc(800, 1020, "确认收货")

uc(1100, 660, "联系店家改价")
uc(1100, 900, "确认配送地址")
uc(1100, 1020, "申请退货")

uc(1360, 160, "申请入驻")
uc(1360, 280, "开店")
uc(1360, 400, "发布商品")
uc(1360, 520, "管理商品")
uc(1360, 640, "管理订单")
uc(1360, 760, "管理客户")
uc(1360, 880, "促销管理")
uc(1360, 1000, "推广引流")

uc(1660, 880, "审核入驻申请")
uc(1660, 1000, "管理商品类别")
uc(1660, 1120, "处理退货申请")

actors = {
    "游客": (90, 250),
    "买家": (90, 780),
    "卖家": (1890, 210),
    "平台管理员": (1890, 1010),
}
for name, (cx, top) in actors.items():
    f.actor(cx, top, name)


def assoc(actor, uc_name):
    acx, atop = actors[actor]
    ax, ay = acx, atop + 52
    ux, uy = use_cases[uc_name]
    ex, ey = ellipse_edge(ux, uy, RX, RY, (ax, ay))
    f.line([(ax, ay), (ex, ey)], 2)


for name in ["浏览商品", "搜索商品", "注册", "登录"]:
    assoc("游客", name)
for name in ["商品比价", "管理购物车", "提交订单", "确认收货"]:
    assoc("买家", name)
for name in ["申请入驻", "开店", "发布商品", "管理商品", "管理订单", "管理客户", "促销管理", "推广引流"]:
    assoc("卖家", name)
for name in ["审核入驻申请", "管理商品类别", "处理退货申请"]:
    assoc("平台管理员", name)


def rel(a, b, label, off=(0, 0), dash=(9, 6)):
    ax, ay = use_cases[a]
    bx, by = use_cases[b]
    if ay == by:
        pts = [(ax + RX, ay), (bx - RX, by)]
    elif ax == bx:
        pts = [(ax, ay + RY), (bx, by - RY)]
    else:
        ex0, ey0 = ellipse_edge(ax, ay, RX, RY, (bx, by))
        ex1, ey1 = ellipse_edge(bx, by, RX, RY, (ax, ay))
        pts = [(ex0, ey0), (ex1, ey1)]
    f.line(pts, 2, dash=dash)
    f.arrow(pts[-1], pts[-2], size=12, filled=False)
    mx, my = (pts[0][0] + pts[-1][0]) / 2 + off[0], (pts[0][1] + pts[-1][1]) / 2 + off[1]
    f.text((mx, my), label, 17, fill=(90, 90, 90))


rel("使用优惠券", "提交订单", "«extend»", off=(-62, 0))
rel("提交订单", "支付", "«include»", off=(64, 0))
rel("提交订单", "确认配送地址", "«include»", off=(2, 52))
rel("联系店家改价", "提交订单", "«extend»", off=(2, 33))
rel("申请退货", "确认收货", "«extend»", off=(0, -22))
rel("管理商品", "发布商品", "«extend»", off=(66, 0))

out = os.path.join(os.path.dirname(__file__), "01_usecase.png")
f.save(out)
print("saved", out)
