import os, sys
from docx import Document
from docx.shared import Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

BASE = r"c:\Users\屋檐水\Desktop\GitTest"
WORK = os.path.join(BASE, "_work")
doc = Document(os.path.join(WORK, "template.docx"))


def set_font(run, size=12, bold=False, cn="宋体", en="Times New Roman"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.name = en
    rPr = run._element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), en)
    rFonts.set(qn("w:hAnsi"), en)
    rFonts.set(qn("w:eastAsia"), cn)


def add_p(cursor, text="", size=12, bold=False, align=None, cn="宋体",
          before=0, after=0, indent=None):
    p = cursor.insert_paragraph_before()
    if text:
        r = p.add_run(text)
        set_font(r, size, bold, cn)
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    if indent is not None:
        pf.first_line_indent = Cm(indent)
    if align is not None:
        p.alignment = align
    return p


def add_image(cursor, name, width=14.5):
    p = cursor.insert_paragraph_before()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    p.add_run().add_picture(os.path.join(WORK, name), width=Cm(width))
    return p


def add_caption(cursor, text):
    return add_p(cursor, text, 10.5, False, WD_ALIGN_PARAGRAPH.CENTER, before=0, after=8)


def shade(cell, color="EDF2F7"):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), color)
    tcPr.append(shd)


def set_borders(table):
    tblPr = table._tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement("w:" + edge)
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), "4")
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), "7F7F7F")
        borders.append(el)
    tblPr.append(borders)


def add_table(cursor, rows, widths=(3.2, 11.2), caption=None, keep_together=False):
    table = doc.add_table(rows=len(rows), cols=len(widths))
    set_borders(table)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    for j, w in enumerate(widths):
        table.columns[j].width = Cm(w)
    for i, row in enumerate(rows):
        for j, val in enumerate(row):
            cell = table.cell(i, j)
            cell.width = Cm(widths[j])
            for k, line in enumerate(str(val).split("\n")):
                p = cell.paragraphs[0] if k == 0 else cell.add_paragraph()
                p.paragraph_format.space_before = Pt(2)
                p.paragraph_format.space_after = Pt(2)
                r = p.add_run(line)
                set_font(r, 10.5, bold=(j == 0))
            if j == 0:
                shade(cell)
    for i, row in enumerate(table.rows):
        if keep_together and i < len(table.rows) - 1:
            for cell in row.cells:
                for p in cell.paragraphs:
                    p.paragraph_format.keep_with_next = True
    cursor._p.addprevious(table._tbl)
    if caption:
        add_p(cursor, caption, 10.5, False, WD_ALIGN_PARAGRAPH.CENTER, before=4, after=2)
    add_p(cursor, "", 6, after=2)


ps = doc.paragraphs
p0, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p31, p32 = (
    ps[0], ps[20], ps[21], ps[22], ps[23], ps[24], ps[25], ps[26],
    ps[27], ps[28], ps[29], ps[31], ps[32])
# 让“用例图：”“顺序图：”“类图：”等标题与后文保持在同一页
for anchor in (p21, p25, p27, p29):
    anchor.paragraph_format.keep_with_next = True

# ---------- 学号 / 姓名 ----------
add_p(ps[1], "学号：2024337621321        姓名：周剑", 12,
      align=WD_ALIGN_PARAGRAPH.CENTER, before=6, after=12)

# ---------- 1. 需求分析 ----------
add_p(p21, "1． 需求分析", 14, True, before=6, after=6)
add_p(p21, "根据实验描述，电子商务网站是一个支持自营与推广两种经营模式的多卖家平台。系统的参与者包括：游客（未登录用户）、"
           "买家、卖家、平台管理员；支付系统、认证服务作为外部系统参与支付与卖家资质校验。", 12, after=4)
add_p(p21, "系统功能需求可归纳为：（1）用户与账号管理：浏览商品、搜索商品、注册、登录；（2）店铺管理：入驻申请、资质审核、"
           "开店与经营模式选择；（3）商品管理：类别维护、固定属性与不固定属性维护、图片上传、上架与下架；（4）购物与订单管理："
           "购物车、提交订单、联系店家改价、使用优惠券、支付、发货、确认收货与退货；（5）营销管理：降价促销、优惠券与打折券；"
           "（6）客户管理：客户搜索、标注、发送站内信；（7）商品比价：同类商品不超过 5 件的价格比较；（8）平台管理：入驻审核、"
           "商品类别管理、售后处理。", 12, after=4)
add_p(p21, "主要业务规则包括：一个卖家可以管理多个店铺；推广引流模式下店铺只负责引流，买家下单后由供应商发货；商品分为实物商品与"
           "虚拟商品，实物商品又分为单件、多件与套装商品；商品是否可租赁单独标识；不同类别的商品具有不同的不固定属性，需要通过"
           "“类别—属性定义—属性值”的结构动态建模；比价单只能包含同类商品且最多 5 件。", 12, after=4)
add_p(p21, "系统用例图如图 1 所示：图中以系统边界划分网站功能，游客、买家、卖家、平台管理员分别与各自的用例关联，并用 «include»、"
           "«extend» 表示用例之间的包含与扩展关系。", 12, after=6)

# ---------- 用例图 ----------
add_image(p22, "01_usecase.png", 14.6)
add_caption(p23, "图 1  电子商务网站系统用例图")
# ---------- 用例描述 ----------
add_p(p24, "下面选取三个关键用例——“购买商品”“发布商品”“卖家入驻与开店”，给出详细描述。", 12, after=6)

uc1 = [
    ("用例编号", "UC-01"),
    ("用例名称", "购买商品（下单、支付与收货）"),
    ("参与者", "买家（主要参与者）、卖家（次要参与者）、支付系统（外部系统）"),
    ("前置条件", "买家已注册并登录；购物车中已有商品；商品处于上架状态且库存充足。"),
    ("后置条件", "生成订单并扣减库存；支付成功后订单状态变为“待发货”，卖家收到发货通知。"),
    ("基本事件流", "1. 买家浏览或搜索商品，查看商品详情与库存；\n"
                 "2. 买家将商品加入购物车，可修改数量或删除商品；\n"
                 "3. 买家提交订单，选择收货地址并确认商品清单；\n"
                 "4. 系统生成订单（状态为“待付款”），并通知卖家确认订单；\n"
                 "5. 买家可联系店家改价，卖家修改订单价格，系统返回新的订单金额；\n"
                 "6. 买家选择可用优惠券，系统计算优惠金额与应付金额；\n"
                 "7. 买家选择支付方式并支付，支付系统返回支付成功；\n"
                 "8. 系统将订单更新为“待发货”，通知卖家发货；\n"
                 "9. 卖家确认订单并填写物流单号发货，系统向买家推送物流信息；\n"
                 "10. 买家收到商品后确认收货，订单完成。"),
    ("扩展与异常流", "E1 库存不足：系统提示商品缺货，订单不生成；\n"
                   "E2 支付失败或超时：订单保持“待付款”，买家可重新支付或取消订单；\n"
                   "E3 发货前买家取消订单：系统退款并恢复库存；\n"
                   "E4 到货后发现质量问题：买家在确认收货后可于售后期内申请退货。"),
    ("业务规则", "订单应付金额 = 商品总额 − 优惠金额 + 运费；同一订单只能使用一张优惠券；只有支付成功的订单才通知卖家发货。"),
]
add_p(p24, "用例描述 UC-01：购买商品", 11, True, before=4, after=2).paragraph_format.keep_with_next = True
add_table(p24, uc1, caption=None)

uc2 = [
    ("用例编号", "UC-02"),
    ("用例名称", "发布商品"),
    ("参与者", "卖家（主要参与者）、商品管理服务、图片存储服务（系统内部服务）"),
    ("前置条件", "卖家已完成入驻并创建店铺，具有商品发布权限。"),
    ("后置条件", "商品保存成功，状态为“已上架”或“定时上架”，可在网站前台检索到。"),
    ("基本事件流", "1. 卖家登录并进入卖家中心，选择要发布商品的店铺；\n"
                 "2. 卖家选择商品类别，系统加载该类别的不固定属性模板（如空调的功率、立式/挂式）；\n"
                 "3. 卖家填写商品固定属性：名称、描述、价格、折扣、库存、制造商、长宽高重、是否可租赁、是否需配套等；\n"
                 "4. 卖家上传一张或多张商品图片，图片服务保存图片并返回图片 URL；\n"
                 "5. 卖家填写不固定属性值，系统按属性模板校验数据类型与必填项；\n"
                 "6. 卖家设置上架时间并提交发布；\n"
                 "7. 系统保存商品并更新为上架状态，返回发布成功。"),
    ("扩展与异常流", "E1 图片格式或大小不符合要求：提示卖家重新上传；\n"
                   "E2 必填属性缺失或数据类型错误：高亮提示并阻止保存；\n"
                   "E3 卖家未开店或无发布权限：提示先完成入驻与开店。"),
    ("业务规则", "同一类别下的商品只能使用该类别已定义的属性；每个商品至少需要一张主图；未填写完整固定属性的商品不能上架。"),
]
add_p(p24, "用例描述 UC-02：发布商品", 11, True, before=8, after=2).paragraph_format.keep_with_next = True
add_table(p24, uc2)

uc3 = [
    ("用例编号", "UC-03"),
    ("用例名称", "卖家入驻与开店"),
    ("参与者", "卖家（主要参与者）、平台管理员（次要参与者）、认证服务（外部系统）"),
    ("前置条件", "申请人具有合法的营业执照或实名信息。"),
    ("后置条件", "生成卖家账号与店铺，卖家可以发布商品；店铺的经营模式为“自营”或“推广”。"),
    ("基本事件流", "1. 卖家提交入驻申请与资质材料；\n"
                 "2. 平台调用认证服务校验营业执照与实名信息；\n"
                 "3. 平台生成待审核任务，平台管理员审核资质材料；\n"
                 "4. 审核通过后，平台分配卖家账号并通知卖家；\n"
                 "5. 卖家填写店铺名称、经营模式（自营/推广）并开店；\n"
                 "6. 平台创建店铺并绑定卖家账号，返回开店成功。"),
    ("扩展与异常流", "E1 资质校验不通过：驳回申请并说明原因，卖家可修改材料后重新提交；\n"
                   "E2 管理员审核不通过：不予开通卖家账号；\n"
                   "E3 选择推广模式：店铺只做推广引流，商品由供应商发货。"),
    ("业务规则", "一个卖家可以管理多个店铺；推广模式店铺不持有库存，订单流转至供应商履约；店铺名称在同一卖家下不能重复。"),
]
add_p(p24, "用例描述 UC-03：卖家入驻与开店", 11, True, before=8, after=2).paragraph_format.keep_with_next = True
add_table(p24, uc3, keep_together=True)

# ---------- 顺序图 ----------
add_p(p26, "顺序图以关键用例为基础，表现买家、卖家与平台之间的交互顺序。图 2 描述买家购买商品的完整过程，包括加入购物车、提交订单、"
           "联系店家改价、使用优惠券、支付、卖家发货以及买家确认收货；图 3 描述卖家发布商品时卖家中心、商品管理服务与图片服务的交互；"
           "图 4 描述卖家提交入驻申请、平台资质校验、管理员审核与开店的过程。", 12, after=6)
add_image(p26, "02_seq_buy.png", 14.4)
add_caption(p26, "图 2  购买商品顺序图")
add_image(p26, "03_seq_publish.png", 14.4)
add_caption(p26, "图 3  卖家发布商品顺序图")
add_image(p26, "04_seq_join.png", 14.4)
add_caption(p27, "图 4  卖家入驻与开店顺序图")

# ---------- 类图 ----------
add_p(p28, "类图按领域划分为四个部分：图 5 表示用户、店铺与商品的基础关系；图 6 表示商品类型与不固定属性的建模；图 7 表示购物车、"
           "订单与营销关系；图 8 表示商品比价功能。类图中标注了类的名字、关键属性以及类间关系的多重性。", 12, after=6)
add_image(p28, "05_class_base.png", 14.4)
add_caption(p28, "图 5  类图（一）：用户、店铺与商品")
add_image(p28, "06_class_product.png", 14.4)
add_caption(p28, "图 6  类图（二）：商品类型与动态属性")
add_image(p28, "07_class_order.png", 14.2)
add_caption(p28, "图 7  类图（三）：购物车、订单与营销")
add_image(p28, "08_class_compare.png", 13.6)
add_caption(p28, "图 8  类图（四）：商品比价")

add_p(p28, "类图设计说明：", 12, True, before=8, after=4)
notes = [
    ("（1）用户继承关系：", "买家与卖家都继承自用户类，分别拥有买家等级、积分与卖家认证状态、保证金等特有属性；"
                            "一个卖家可以管理 0..* 个店铺。"),
    ("（2）店铺与商品：", "店铺组合多个商品（1 对 *），商品组合多张商品图片（1 对 *）；店铺可关联 0..1 个供应商，"
                          "用于表示推广引流模式下由供应商发货。"),
    ("（3）商品类型：", "商品分为实物商品与虚拟商品，实物商品进一步分为单件商品、多件商品和套装商品；"
                        "“是否可租赁”作为商品的属性标识可租赁商品。"),
    ("（4）不固定属性：", "商品类别 1 对 * 定义属性定义（如功率、材质），属性定义 1 对 * 对应商品属性值，商品 1 对 * 拥有商品属性值，"
                          "从而支持不同类别商品的差异化属性。"),
    ("（5）交易关系：", "买家 1 对 1 购物车，购物车 1 对 * 购物车项；订单 1 对 * 订单项；订单多对 1 收货地址；"
                        "订单 0..* 对 0..1 优惠券与促销活动；订单 1 对 0..1 退货申请。"),
    ("（6）比价关系：", "买家 1 对 * 比价单；比价单 1 对 1..5 比价项，限定同类商品最多 5 件；比价项多对 1 商品。"),
]
for head, body in notes:
    p = p29.insert_paragraph_before()
    r1 = p.add_run(head)
    set_font(r1, 12, True)
    r2 = p.add_run(body)
    set_font(r2, 12, False)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)

# ---------- 设计模式 ----------
add_p(p32, "（1）装饰器模式", 12, True, before=4, after=4).paragraph_format.keep_with_next = True
add_p(p32, "装饰器模式用于在不改变原有对象的前提下，动态地为对象增加职责。图 9 以“门”为例：Door 是组件接口，声明 open()、close()；"
           "SimpleDoor 是具体组件；DoorDecorator 是抽象装饰器，内部持有一个 Door 引用（组合关系 1—1），并把 open()、close() 委托给"
           "被装饰的门；LockDecorator、BellDecorator、CoupletDecorator 是具体装饰器，分别为门增加门锁、门铃、对联功能。客户端可以"
           "按需叠加多个装饰器，既不需要修改 SimpleDoor，也不需要为每种组合创建新的类，符合开闭原则。", 12, after=6)
add_image(p32, "09_decorator.png", 14.2)
add_caption(p32, "图 9  装饰器模式类图（门）")

add_p(p32, "（2）观察者模式", 12, True, before=8, after=4).paragraph_format.keep_with_next = True
add_p(p32, "观察者模式定义对象间的一对多依赖关系：当被观察者的状态发生变化时，所有观察者都会收到通知。图 10 以“邮箱新邮件通知”为例："
           "MailBox 作为被观察者（Subject），维护观察者列表 observers，并提供 attach()、detach()、notify()；Observer 是观察者接口，"
           "声明 update(mail)；QQNotifier、SmsNotifier、AppNotifier 是具体观察者，分别通过 QQ、短信、APP 提醒用户查看邮件。"
           "MailBox 与 Observer 之间为 1 对多关联（1—*），新增通知渠道时只需实现 Observer 接口并注册到 MailBox，无需修改被观察者。", 12, after=6)
add_image(p32, "10_observer.png", 14.4)
add_caption(p32, "图 10  观察者模式类图（邮箱新邮件通知）")

# 去除模板中残留的黄色高亮
for _p in doc.paragraphs:
    for _r in _p.runs:
        if _r.font.highlight_color is not None:
            _r.font.highlight_color = None

out = os.path.join(BASE, "2024337621321-周剑-实验一 需求获取与分析.docx")
doc.save(out)
print("saved", out)
