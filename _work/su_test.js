(function () {
  try {
    const app = window.app
    const out = {}
    app.project.newProject()
    const proj = app.project.getProject()
    proj.name = 'StarUML测试'
    const model = app.factory.createModel({ id: 'UMLModel', parent: proj, field: 'ownedElements' })
    model.name = '电子商务网站'
    const d = app.factory.createDiagram({ id: 'UMLUseCaseDiagram', parent: model })
    d.name = '系统用例图'
    out.diagram = d.name

    const a = app.factory.createModelAndView({
      id: 'UMLActor', parent: model, diagram: d,
      x1: 60, y1: 40, x2: 140, y2: 160,
      'model-init': { name: '游客' }
    })
    const u = app.factory.createModelAndView({
      id: 'UMLUseCase', parent: model, diagram: d,
      x1: 330, y1: 60, x2: 560, y2: 142,
      'model-init': { name: '浏览商品' }
    })
    out.actorView = a._type
    out.ucView = u._type

    const as = app.factory.createModelAndView({
      id: 'UMLAssociation', parent: model, diagram: d,
      tailModel: a.model, headModel: u.model,
      tailView: a, headView: u,
      x1: 140, y1: 100, x2: 330, y2: 100
    })
    out.assoc = as._type + ' / ' + as.model._type

    const subj = app.factory.createModelAndView({
      id: 'UMLUseCaseSubject', parent: model, diagram: d,
      x1: 180, y1: 20, x2: 900, y2: 400,
      'model-init': { name: '电子商务网站系统' }
    })
    out.subject = subj._type

    app.diagrams.openDiagram(d)
    app.diagrams.setZoomLevel(0.65)
    if (app.diagrams.isGridVisible()) { app.diagrams.toggleGrid() }
    app.project.save('C:/Users/屋檐水/Desktop/GitTest/_work/test1.mdj')
    out.saved = app.project.getFilename()
    out.canvas = (function () {
      const el = document.getElementById('diagram-canvas')
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left, y: r.top, width: r.width, height: r.height }
    })()
    out.views = d.ownedViews.map(v => v._type)
    return JSON.stringify(out)
  } catch (e) {
    return 'ERR ' + (e && e.stack ? e.stack : e)
  }
})()
