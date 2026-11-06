import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from umlcore import Fig, F, SS

OUT = os.path.dirname(__file__)


def seq_diagram(path, width, lifelines, msgs, title=None):
    n = len(lifelines)
    step = 72
    top = 46
    head_h = 56
    start_y = 180
    height = start_y + (len(msgs) - 1) * step + 110
    f = Fig(width, height)
    xs = [x for _, x in lifelines]

    # headers and lifelines
    for (name, x), idx in zip(lifelines, range(n)):
        bw = 180
        f.rect(x - bw / 2, top, bw, head_h, fill=(219, 232, 242), outline=(90, 105, 120), width=2)
        f.text((x, top + head_h / 2), name, 23, bold=True, fill=(30, 45, 60))
        f.line([(x, top + head_h), (x, height - 50)], 1.5, fill=(130, 140, 150), dash=(7, 6))

    ys = [start_y + i * step for i in range(len(msgs))]

    # activation bars
    for i, x in enumerate(xs):
        involved = [ys[k] for k, m in enumerate(msgs) if m[0] == i or m[1] == i]
        if involved:
            y1, y2 = min(involved) - 14, max(involved) + 14
            f.rect(x - 7, y1, 14, y2 - y1, fill=(240, 243, 246), outline=(120, 130, 140), width=1.5)

    for k, m in enumerate(msgs):
        i, j, text, kind = m
        y = ys[k]
        x1, x2 = xs[i], xs[j]
        if i == j:
            # self message
            f.line([(x1 + 7, y), (x1 + 76, y), (x1 + 76, y + 20), (x1 + 7, y + 20)], 2)
            f.arrow((x1, y + 20), (x1 + 40, y + 20), size=12)
            f.text((x1 + 88, y + 6), text, 21, anchor="lm")
        else:
            d = 1 if x2 > x1 else -1
            sx, ex = x1 + d * 7, x2 - d * 7
            if kind == "return":
                f.line([(sx, y), (ex, y)], 2, dash=(9, 6))
                f.arrow((ex, y), (sx, y), size=12, filled=False)
            else:
                f.line([(sx, y), (ex, y)], 2)
                f.arrow((ex, y), (sx, y), size=13, filled=True)
            mx = (sx + ex) / 2
            f.text((mx, y - 20), text, 21)

    if title:
        f.text((width / 2, 14), title, 24, bold=True)
    f.save(os.path.join(OUT, path))


# ---------------- 1. 购买商品 ----------------
seq_diagram(
    "02_seq_buy.png", 1720,
    [("买家", 220), ("电子商务平台", 660), ("卖家", 1090), ("支付系统", 1470)],
    [
        (0, 1, "浏览 / 搜索商品()", "sync"),
        (1, 1, "查询商品信息与库存", "self"),
        (0, 1, "加入购物车()", "sync"),
        (0, 1, "提交订单(商品、数量)", "sync"),
        (1, 2, "推送订单(待卖家确认)", "sync"),
        (0, 1, "请求联系店家改价", "sync"),
        (1, 2, "转发改价请求", "sync"),
        (2, 1, "修改订单价格", "sync"),
        (1, 0, "返回改价后的订单金额", "return"),
        (0, 1, "使用优惠券并确认收货地址", "sync"),
        (1, 1, "计算优惠金额与运费", "self"),
        (0, 1, "选择支付方式并支付()", "sync"),
        (1, 3, "发起支付请求(金额)", "sync"),
        (3, 1, "支付成功回调(交易号)", "return"),
        (1, 0, "支付成功，订单已确认", "return"),
        (1, 2, "通知发货", "sync"),
        (2, 1, "确认订单并发货(物流单号)", "sync"),
        (1, 0, "发货通知与物流信息", "return"),
    ],
)

# ---------------- 2. 发布商品 ----------------
seq_diagram(
    "03_seq_publish.png", 1760,
    [("卖家", 220), ("卖家中心(平台)", 650), ("商品管理服务", 1120), ("图片存储服务", 1510)],
    [
        (0, 1, "登录并进入卖家中心", "sync"),
        (1, 2, "校验卖家身份与店铺权限", "sync"),
        (2, 1, "返回店铺列表", "return"),
        (1, 0, "显示店铺与商品类别", "return"),
        (0, 1, "选择店铺与商品类别", "sync"),
        (1, 2, "获取类别属性模板", "sync"),
        (2, 1, "返回属性模板(名称、类型、必填项)", "return"),
        (0, 1, "填写商品信息(名称、价格、库存等)", "sync"),
        (0, 1, "上传商品图片(可多张)", "sync"),
        (1, 3, "保存图片文件", "sync"),
        (3, 1, "返回图片URL列表", "return"),
        (0, 1, "设置自定义属性(功率、材质等)", "sync"),
        (1, 2, "校验属性并保存商品", "sync"),
        (2, 1, "返回商品编号", "return"),
        (0, 1, "设置上架时间并提交上架", "sync"),
        (1, 2, "更新商品状态为上架", "sync"),
        (2, 1, "返回上架成功", "return"),
        (1, 0, "商品发布成功", "return"),
    ],
)

# ---------------- 3. 卖家入驻 ----------------
seq_diagram(
    "04_seq_join.png", 1780,
    [("卖家", 220), ("电子商务平台", 700), ("认证服务", 1180), ("平台管理员", 1560)],
    [
        (0, 1, "提交入驻申请(资质材料)", "sync"),
        (1, 2, "校验营业执照与实名信息", "sync"),
        (2, 1, "返回校验结果", "return"),
        (1, 3, "生成待审核任务", "sync"),
        (3, 1, "查看资质材料并审核", "sync"),
        (3, 1, "审核通过，分配卖家账号", "return"),
        (1, 0, "通知入驻成功", "return"),
        (0, 1, "开店(店铺名称、经营模式)", "sync"),
        (1, 1, "创建店铺并绑定卖家账号", "self"),
        (1, 0, "返回店铺创建成功", "return"),
        (0, 1, "选择经营模式(自营 / 推广)", "sync"),
        (1, 0, "入驻完成，可发布商品", "return"),
    ],
)
print("sequence diagrams done")
