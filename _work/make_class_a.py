import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from umlcore import Fig
from classdraw import class_box, connect, mult_at

OUT = os.path.dirname(__file__)

# ================= 类图 1：用户、店铺与商品 =================
f = Fig(1500, 1120)

User = class_box(f, 560, 30, 360, "用户 User",
                 ["- 用户编号: String", "- 用户名: String", "- 手机号: String", "- 用户类型: 枚举"])
Buyer = class_box(f, 110, 270, 350, "买家 Buyer",
                  ["- 买家编号: String", "- 买家等级: int", "- 积分: int"],
                  ["+ 下单()", "+ 申请退货()"])
Seller = class_box(f, 1040, 270, 350, "卖家 Seller",
                   ["- 卖家编号: String", "- 认证状态: String", "- 保证金: Decimal"],
                   ["+ 申请入驻()", "+ 发布商品()"])
Category = class_box(f, 90, 550, 340, "商品类别 Category",
                     ["- 类别编号: String", "- 类别名称: String", "- 父类别编号: String"],
                     ["+ 添加子类别()"])
Product = class_box(f, 550, 510, 400, "商品 Product",
                    ["- 商品编号: String", "- 商品名称: String", "- 价格: Decimal",
                     "- 库存数量: int", "- 是否上架: Boolean", "- 是否可租赁: Boolean"],
                    ["+ 上架()", "+ 计算实付价()"])
Shop = class_box(f, 1040, 575, 350, "店铺 Shop",
                 ["- 店铺编号: String", "- 店铺名称: String", "- 经营模式: 枚举",
                  "- 店铺状态: String"], ["+ 管理商品()"])
ProductImage = class_box(f, 550, 880, 360, "商品图片 ProductImage",
                         ["- 图片编号: String", "- 图片URL: String", "- 排序号: int", "- 是否主图: Boolean"])
Supplier = class_box(f, 1040, 880, 350, "供应商 Supplier",
                     ["- 供应商编号: String", "- 供应商名称: String", "- 联系方式: String",
                      "- 结算方式: String"])

connect(f, Buyer, User, "inherit")
connect(f, Seller, User, "inherit")

connect(f, Seller, Shop, "assoc")
mult_at(f, (1235, 515), "1")
mult_at(f, (1235, 560), "0..*")

connect(f, Shop, Product, "comp")
mult_at(f, (1018, 700), "1")
mult_at(f, (966, 645), "*")

connect(f, Category, Product, "assoc")
mult_at(f, (447, 640), "1")
mult_at(f, (528, 645), "*")

connect(f, Product, ProductImage, "comp")
mult_at(f, (762, 840), "1")
mult_at(f, (762, 870), "*")

connect(f, Shop, Supplier, "assoc")
mult_at(f, (1235, 820), "0..*")
mult_at(f, (1235, 866), "0..1")

f.save(os.path.join(OUT, "05_class_base.png"))

# ================= 类图 2：商品类型与动态属性 =================
f = Fig(1500, 880)
Product2 = class_box(f, 80, 40, 350, "商品 Product（引用）",
                     ["- 商品编号: String", "- 商品名称: String", "- 基准价格: Decimal"],
                     ref=True)
Category2 = class_box(f, 520, 40, 330, "商品类别 Category（引用）",
                      ["- 类别编号: String", "- 类别名称: String"], ref=True)
AttrDef = class_box(f, 980, 40, 360, "属性定义 AttributeDef",
                    ["- 属性编号: String", "- 属性名称: String", "- 数据类型: String",
                     "- 是否必填: Boolean"], ["+ 校验值()"])
AttrVal = class_box(f, 980, 330, 360, "商品属性值 ProductAttrValue",
                    ["- 属性值编号: String", "- 属性值: String", "- 计量单位: String"])
Physical = class_box(f, 120, 300, 350, "实物商品 PhysicalProduct",
                     ["- 包装规格: String", "- 是否需配套: Boolean"])
Virtual = class_box(f, 120, 720, 350, "虚拟商品 VirtualProduct",
                    ["- 卡密/下载链接: String", "- 有效天数: int"])
Single = class_box(f, 560, 300, 280, "单件商品 SingleItem",
                  ["- 单件规格: String"])
Multi = class_box(f, 560, 455, 280, "多件商品 MultiItem",
                  ["- 组合件数: int", "- 单件规格: String"])
Bundle = class_box(f, 560, 615, 280, "套装商品 BundleItem",
                   ["- 套装件数: int", "- 套装清单: String"])

connect(f, Physical, Product2, "inherit")
connect(f, Virtual, Product2, "inherit", route=[(45, 760), (45, 170)])
connect(f, Single, Physical, "inherit")
connect(f, Multi, Physical, "inherit")
connect(f, Bundle, Physical, "inherit")

connect(f, Product2, AttrVal, "comp")
mult_at(f, (448, 132), "1")
mult_at(f, (952, 408), "*")

connect(f, AttrDef, AttrVal, "assoc")
mult_at(f, (1185, 282), "1")
mult_at(f, (1185, 312), "*")

connect(f, Category2, AttrDef, "assoc")
mult_at(f, (872, 100), "1")
mult_at(f, (955, 100), "*")

connect(f, Category2, Product2, "assoc")
mult_at(f, (452, 96), "1")
mult_at(f, (500, 96), "*")

f.save(os.path.join(OUT, "06_class_product.png"))
print("class diagrams A done")
