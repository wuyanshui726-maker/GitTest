(function () {
  const app = window.app
  try {
    app.project.newProject()
    const proj = app.project.getProject()
    proj.name = '测试2'
    const model = app.factory.createModel({ id: 'UMLModel', parent: proj, field: 'ownedElements' })
    model.name = '电子商务网站'

    /* ---------- 类图 ---------- */
    const cd = app.factory.createDiagram({ id: 'UMLClassDiagram', parent: model })
    cd.name = '类图测试'
    const buyer = app.factory.createModelAndView({
      id: 'UMLClass', parent: model, diagram: cd, x1: 40, y1: 40, x2: 280, y2: 160,
      'model-init': { name: '买家' }
    })
    const cls = buyer.model
    ;['用户编号: String', '姓名: String', '等级: Integer', '积分: Integer'].forEach(function (t, i) {
      const a = app.factory.createModel({ id: 'UMLAttribute', parent: cls, field: 'attributes' })
      a.name = t.split(': ')[0]
      a.type = t.split(': ')[1]
      a.visibility = 'private'
    })
    const ord = app.factory.createModelAndView({
      id: 'UMLClass', parent: model, diagram: cd, x1: 460, y1: 40, x2: 720, y2: 140,
      'model-init': { name: '订单' }
    })
    ;['订单编号: String', '总金额: Double'].forEach(function (t) {
      const a = app.factory.createModel({ id: 'UMLAttribute', parent: ord.model, field: 'attributes' })
      a.name = t.split(': ')[0]
      a.type = t.split(': ')[1]
      a.visibility = 'private'
    })
    const assoc = app.factory.createModelAndView({
      id: 'UMLAssociation', parent: model, diagram: cd,
      tailView: buyer, headView: ord, tailModel: cls, headModel: ord.model,
      x1: 280, y1: 100, x2: 460, y2: 100
    })
    assoc.model.end1.multiplicity = '1'
    assoc.model.end2.multiplicity = '0..*'
    assoc.model.end1.name = '买家'
    assoc.model.end2.name = '订单'

    /* ---------- 顺序图 ---------- */
    const sd = app.factory.createDiagram({ id: 'UMLSequenceDiagram', parent: model })
    sd.name = '购买商品顺序图'
    const inter = sd._parent
    const l1 = app.factory.createModelAndView({
      id: 'UMLLifeline', parent: inter, diagram: sd, x1: 160, y1: 30, x2: 260, y2: 90,
      'model-init': { name: '买家' }
    })
    const l2 = app.factory.createModelAndView({
      id: 'UMLLifeline', parent: inter, diagram: sd, x1: 400, y1: 30, x2: 500, y2: 90,
      'model-init': { name: '购物车' }
    })
    const m1 = app.factory.createModelAndView({
      id: 'UMLMessage', parent: inter, diagram: sd,
      tailView: l1, headView: l2, x1: 210, y1: 160, x2: 450, y2: 160,
      'model-init': { name: '加入购物车()' }
    })
    const m2 = app.factory.createModelAndView({
      id: 'UMLMessage', parent: inter, diagram: sd,
      tailView: l2, headView: l1, x1: 450, y1: 220, x2: 210, y2: 220,
      'model-init': { name: '返回添加结果' }
    })
    try { m2.model.messageSort = 'reply' } catch (e) { }

    app.diagrams.openDiagram(sd)
    app.diagrams.setZoomLevel(1)
    if (app.diagrams.isGridVisible()) app.diagrams.toggleGrid()
    app.project.save('C:/Users/屋檐水/Desktop/GitTest/_work/test2.mdj')
    return JSON.stringify({
      ok: true, views: sd.ownedViews.map(function (v) { return v.getClassName() }),
      cdViews: cd.ownedViews.map(function (v) { return v.getClassName() })
    })
  } catch (e) {
    return 'ERR ' + (e && e.stack ? e.stack : e)
  }
})()
