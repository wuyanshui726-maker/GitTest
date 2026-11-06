import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from umlcore import Fig
from classdraw import class_box, connect, mult_at

OUT = os.path.dirname(__file__)

# ================= 类图 3：购物车、订单与营销 =================
f = Fig(1500, 1140)
Buyer = class_box(f, 60, 40, 320, "买家 Buyer（引用）",
                  ["- 买家编号: String", "- 买家等级: int", "- 积分: int"], ref=True)
Cart = class_box(f, 60, 280, 340, "购物车 Cart",
                 ["- 购物车编号: String", "- 创建时间: Date", "- 合计金额: Decimal"])
CartItem = class_box(f, 60, 520, 360, "购物车项 CartItem",
                     ["- 购物车项编号: String", "- 数量: int", "- 加入时间: Date",
                      "- 是否选中: Boolean"])
Address = class_box(f, 60, 800, 360, "收货地址 Address",
                    ["- 地址编号: String", "- 收件人: String", "- 联系电话: String",
                     "- 省市区: String", "- 详细地址: String", "- 是否默认: Boolean"])
Order = class_box(f, 500, 40, 400, "订单 Order",
                  ["- 订单编号: String", "- 下单时间: Date", "- 订单状态: 枚举",
                   "- 商品总额: Decimal", "- 优惠金额: Decimal", "- 实付金额: Decimal",
                   "- 支付方式: String"], ["+ 生成订单()", "+ 确认收货()"])
OrderItem = class_box(f, 500, 480, 340, "订单项 OrderItem",
                      ["- 订单项编号: String", "- 数量: int", "- 成交单价: Decimal",
                       "- 小计: Decimal"])
ReturnReq = class_box(f, 960, 620, 360, "退货申请 ReturnRequest",
                      ["- 申请编号: String", "- 退货原因: String", "- 申请时间: Date",
                       "- 审核状态: 枚举", "- 退款金额: Decimal"], ["+ 审核()"])
Coupon = class_box(f, 960, 40, 360, "优惠券 Coupon",
                   ["- 券编号: String", "- 券类型: 枚举", "- 面额: Decimal",
                    "- 折扣率: Decimal", "- 使用门槛: Decimal", "- 生效时间: Date",
                    "- 失效时间: Date", "- 状态: 枚举"])
Promotion = class_box(f, 960, 360, 360, "促销活动 Promotion",
                      ["- 活动编号: String", "- 活动类型: 枚举", "- 折扣率: Decimal",
                       "- 开始时间: Date", "- 结束时间: Date"])
Product = class_box(f, 500, 860, 350, "商品 Product（引用）",
                    ["- 商品编号: String", "- 商品名称: String", "- 价格: Decimal"], ref=True)

# Buyer - Cart (1 - 1, 组合)
pts = connect(f, Buyer, Cart, "comp")
mult_at(f, (248, 170), "1")
mult_at(f, (248, 258), "1")
# Buyer - Order (1 - *)
pts = connect(f, Buyer, Order, "assoc")
mult_at(f, (425, 78), "1")
mult_at(f, (468, 102), "*")
# Buyer - Address (1 - *, 组合) 走左侧通道
pts = connect(f, Buyer, Address, "comp", route=[(28, 90), (28, 900)])
mult_at(f, (44, 145), "1")
mult_at(f, (44, 870), "*")
# Cart - CartItem (1 - *)
pts = connect(f, Cart, CartItem, "comp")
mult_at(f, (248, 462), "1")
mult_at(f, (258, 500), "*")
# CartItem - Product (* - 1)
pts = connect(f, CartItem, Product, "assoc")
mult_at(f, (352, 712), "*")
mult_at(f, (575, 838), "1")
# Order - OrderItem (1 - *)
pts = connect(f, Order, OrderItem, "comp")
mult_at(f, (700, 405), "1")
mult_at(f, (700, 460), "*")
# OrderItem - Product (* - 1)
pts = connect(f, OrderItem, Product, "assoc")
mult_at(f, (660, 672), "*")
mult_at(f, (660, 842), "1")
# Order - Address (* - 1)
pts = connect(f, Order, Address, "assoc")
mult_at(f, (477, 342), "*")
mult_at(f, (438, 792), "1")
# Order - Coupon (0..* - 0..1)
pts = connect(f, Order, Coupon, "assoc")
mult_at(f, (912, 100), "0..*")
mult_at(f, (932, 142), "0..1")
# Order - Promotion (0..* - 0..1)
pts = connect(f, Order, Promotion, "assoc")
mult_at(f, (914, 292), "0..*")
mult_at(f, (952, 392), "0..1")
# Order - ReturnRequest (1 - 0..1, 组合) 通道 x=910
pts = connect(f, Order, ReturnReq, "comp", route=[(915, 330), (915, 690)])
mult_at(f, (862, 392), "1")
mult_at(f, (935, 706), "0..1")

f.save(os.path.join(OUT, "07_class_order.png"))

# ================= 类图 4：商品比价 =================
f = Fig(1320, 620)
Buyer4 = class_box(f, 60, 60, 320, "买家 Buyer（引用）",
                   ["- 买家编号: String", "- 买家等级: int", "- 积分: int"], ref=True)
Comp = class_box(f, 60, 290, 350, "比价单 Comparison",
                 ["- 比价单编号: String", "- 创建时间: Date", "- 比较维度: String"],
                 ["+ 添加商品()"])
CompItem = class_box(f, 540, 290, 350, "比价项 ComparisonItem",
                     ["- 比价项编号: String", "- 快照价格: Decimal", "- 快照时间: Date"])
Product4 = class_box(f, 1000, 300, 300, "商品 Product（引用）",
                     ["- 商品编号: String", "- 商品名称: String"], ref=True)

f.note(540, 60, 460, 105, ["比价单中的商品须为同一类别，", "且最多只能添加 5 件商品。"], 18)

pts = connect(f, Buyer4, Comp, "assoc")
mult_at(f, (280, 235), "1")
mult_at(f, (370, 270), "*")
pts = connect(f, Comp, CompItem, "assoc")
mult_at(f, (425, 320), "1")
mult_at(f, (500, 360), "1..5")
pts = connect(f, CompItem, Product4, "assoc")
mult_at(f, (910, 335), "*")
mult_at(f, (985, 380), "1")

f.save(os.path.join(OUT, "08_class_compare.png"))
print("class diagrams B done")
