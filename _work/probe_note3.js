(function () {
  var out = {}
  try {
    out.typeKeys = Object.keys(app.type).filter(function (k) { return /Note|Text|Constraint/i.test(k) })
    var T = app.type.UMLNote
    out.hasType = !!T
    if (T) {
      out.protoNames = Object.getOwnPropertyNames(T.prototype).slice(0, 80)
      out.staticNames = Object.getOwnPropertyNames(T).slice(0, 80)
    }
  } catch (e) { out.err1 = String(e) }
  try {
    var proj = app.project.getProject()
    var diag = null
    ;(function walk (els) {
      (els || []).forEach(function (e) {
        if (!diag && e.getClassName && e.getClassName() === 'UMLClassDiagram') diag = e
        if (e.ownedElements) walk(e.ownedElements)
        if (e.ownedViews) walk(e.ownedViews)
      })
    })(proj.ownedElements)
    out.diagram = diag ? diag.name : null
    out.parentClass = diag ? diag._parent.getClassName() : null
    var v = app.factory.createModelAndView({
      id: 'UMLNote', parent: diag._parent, diagram: diag,
      x1: 50, y1: 50, x2: 450, y2: 150
    })
    out.viewClass = v ? v.getClassName() : null
    out.modelClass = v && v.model ? v.model.getClassName() : null
    if (v && v.model) {
      out.modelKeys = Object.keys(v.model).filter(function (k) { return k.indexOf('_') !== 0 }).slice(0, 50)
      v.model.name = 'N1'
      v.update(app.diagrams.getEditor().canvas)
      out.textAfterName = v.text
      v.model.text = 'L1\nL2'
      v.update(app.diagrams.getEditor().canvas)
      out.textAfterText = v.text
      out.modelText = v.model.text
    }
    out.viewKeys = v ? Object.keys(v).filter(function (k) { return k.indexOf('_') !== 0 && typeof v[k] !== 'function' }).slice(0, 60) : null
  } catch (e) { out.err2 = String(e && e.stack ? e.stack : e) }
  return JSON.stringify(out, null, 1)
})()
