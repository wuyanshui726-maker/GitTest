(function () {
  const app = window.app
  const fs = require('fs')
  const SPEC = 'C:/Users/屋檐水/Desktop/GitTest/_work/spec.json'
  const OUT = 'C:/Users/屋檐水/Desktop/GitTest/_work/staruml_model.mdj'

  function splitNT (t) {
    const i = t.indexOf(':')
    if (i < 0) return [t.trim(), '']
    return [t.slice(0, i).trim(), t.slice(i + 1).trim()]
  }

  function addOp (m, t) {
    const s = t.trim()
    const o = app.factory.createModel({ id: 'UMLOperation', parent: m, field: 'operations' })
    o.visibility = 'public'
    const i = s.indexOf('(')
    if (i < 0) { o.name = s; return }
    o.name = s.slice(0, i).trim()
    const j = s.lastIndexOf(')')
    const inner = s.slice(i + 1, j < 0 ? s.length : j).trim()
    if (inner) {
      inner.split(',').forEach(function (p) {
        const pv = app.factory.createModel({ id: 'UMLParameter', parent: o, field: 'parameters' })
        const nt = splitNT(p)
        pv.name = nt[0]
        if (nt[1]) pv.type = nt[1]
      })
    }
  }

  function addClass (diagram, parent, item) {
    const id = item.stereo === 'interface' ? 'UMLInterface' : 'UMLClass'
    const n = (item.attrs || []).length + (item.ops || []).length
    const h = 34 + 19 * n + (item.stereo === 'interface' ? 19 : 0)
    const v = app.factory.createModelAndView({
      id: id, parent: parent, diagram: diagram,
      x1: item.x, y1: item.y, x2: item.x + item.w, y2: item.y + h,
      'model-init': { name: item.name }
    })
    const m = v.model
    ;(item.attrs || []).forEach(function (t) {
      const a = app.factory.createModel({ id: 'UMLAttribute', parent: m, field: 'attributes' })
      const nt = splitNT(t)
      a.name = nt[0]
      if (nt[1]) a.type = nt[1]
      a.visibility = 'private'
    })
    ;(item.ops || []).forEach(function (t) { addOp(m, t) })
    if (!m.attributes || m.attributes.length === 0) v.suppressAttributes = true
    if (item.stereo === 'interface') {
      v.stereotypeDisplay = 'label'
      v.suppressOperations = false
      v.suppressReceptions = true
    } else if (!m.operations || m.operations.length === 0) {
      v.suppressOperations = true
    }
    return v
  }

  function addRel (diagram, parent, r, views) {
    const tail = views[r.from], head = views[r.to]
    if (!tail || !head) throw new Error('missing view ' + r.from + ' -> ' + r.to)
    if (r.type === 'gen') {
      return app.factory.createModelAndView({
        id: 'UMLGeneralization', parent: parent, diagram: diagram,
        tailModel: tail.model, headModel: head.model, tailView: tail, headView: head
      })
    }
    if (r.type === 'include' || r.type === 'extend') {
      return app.factory.createModelAndView({
        id: r.type === 'include' ? 'UMLInclude' : 'UMLExtend',
        parent: parent, diagram: diagram,
        tailModel: tail.model, headModel: head.model, tailView: tail, headView: head
      })
    }
    const v = app.factory.createModelAndView({
      id: 'UMLAssociation', parent: parent, diagram: diagram,
      tailModel: tail.model, headModel: head.model, tailView: tail, headView: head
    })
    const a = v.model
    if (r.type === 'comp') a.end1.aggregation = 'composite'
    if (r.m1) a.end1.multiplicity = r.m1
    if (r.m2) a.end2.multiplicity = r.m2
    if (r.role1) a.end1.name = r.role1
    return v
  }

  try {
    const spec = JSON.parse(fs.readFileSync(SPEC, 'utf8'))
    app.project.newProject()
    const proj = app.project.getProject()
    proj.name = spec.projectName
    const model = app.factory.createModel({ id: 'UMLModel', parent: proj, field: 'ownedElements' })
    model.name = spec.modelName
    const report = { diagrams: [] }

    /* ---------------- 用例图 ---------------- */
    const uc = spec.useCase
    const ucd = app.factory.createDiagram({ id: 'UMLUseCaseDiagram', parent: model })
    ucd.name = uc.diagram
    app.factory.createModelAndView({
      id: 'UMLUseCaseSubject', parent: model, diagram: ucd,
      x1: uc.boundary.x, y1: uc.boundary.y,
      x2: uc.boundary.x + uc.boundary.w, y2: uc.boundary.y + uc.boundary.h,
      'model-init': { name: uc.boundary.name }
    })
    const ucv = {}
    uc.actors.forEach(function (a) {
      ucv[a.id] = app.factory.createModelAndView({
        id: 'UMLActor', parent: model, diagram: ucd,
        x1: a.cx - 50, y1: a.y, x2: a.cx + 50, y2: a.y + 130,
        'model-init': { name: a.name }
      })
    })
    uc.useCases.forEach(function (u) {
      ucv[u.id] = app.factory.createModelAndView({
        id: 'UMLUseCase', parent: model, diagram: ucd,
        x1: u.cx - 115, y1: u.cy - 41, x2: u.cx + 115, y2: u.cy + 41,
        'model-init': { name: u.name }
      })
    })
    uc.actorLinks.forEach(function (l) {
      addRel(ucd, model, { type: 'assoc', from: l[0], to: l[1] }, ucv)
    })
    uc.relations.forEach(function (r) { addRel(ucd, model, r, ucv) })
    report.diagrams.push(uc.diagram)

    /* ---------------- 顺序图 ---------------- */
    spec.sequences.forEach(function (s) {
      const sd = app.factory.createDiagram({ id: 'UMLSequenceDiagram', parent: model })
      sd.name = s.diagram
      const inter = sd._parent
      const frame = sd.ownedViews.find(function (v) { return v.getClassName() === 'UMLFrameView' })
      if (frame) {
        frame.visible = false
        if (typeof sd.removeOwnedView === 'function') sd.removeOwnedView(frame)
      }
      const lv = {}
      const xs = {}
      const step = 72, startY = 190
      s.lifelines.forEach(function (l) {
        xs[l.id] = l.x
        lv[l.id] = app.factory.createModelAndView({
          id: 'UMLLifeline', parent: inter, diagram: sd,
          x1: l.x - 85, y1: 40, x2: l.x + 85, y2: 40 + 140 + step * s.messages.length,
          modelInitializer: function (m) {
            m.name = l.name
            m.represent.name = l.name
          }
        })
      })
      s.messages.forEach(function (msg, i) {
        const y = startY + i * step
        const tv = lv[msg.from], hv = lv[msg.to]
        const v = app.factory.createModelAndView({
          id: 'UMLMessage', parent: inter, diagram: sd,
          tailView: tv, headView: hv,
          x1: xs[msg.from], y1: y,
          x2: xs[msg.to], y2: y,
          'model-init': { name: msg.text }
        })
        if (msg.kind === 'return') v.model.messageSort = 'reply'
      })
      report.diagrams.push(s.diagram)
    })

    /* ---------------- 类图 ---------------- */
    spec.classes.forEach(function (c) {
      const cd = app.factory.createDiagram({ id: 'UMLClassDiagram', parent: model })
      cd.name = c.diagram
      const views = {}
      c.items.forEach(function (it) { views[it.id] = addClass(cd, model, it) })
      c.rels.forEach(function (r) { addRel(cd, model, r, views) })
      report.diagrams.push(c.diagram)
    })

    app.project.save(OUT)
    report.saved = app.project.getFilename()
    return JSON.stringify(report)
  } catch (e) {
    return 'ERR ' + (e && e.stack ? e.stack : e)
  }
})()
