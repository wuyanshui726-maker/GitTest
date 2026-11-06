(function () {
  var proj = app.project.getProject()
  var diag = null
  ;(function walk (els) {
    (els || []).forEach(function (e) {
      if (!diag && e.getClassName && e.getClassName() === 'UMLClassDiagram' && e.name.indexOf('类图（四）') === 0) diag = e
      if (e.ownedElements) walk(e.ownedElements)
      if (e.ownedViews) walk(e.ownedViews)
    })
  })(proj.ownedElements)
  if (!diag) return 'no diagram'
  var v = app.factory.createModelAndView({
    id: 'UMLConstraint', parent: diag._parent, diagram: diag,
    x1: 540, y1: 60, x2: 1000, y2: 165
  })
  v.model.specification = '比价单中的商品须为同一类别，且最多只能添加 5 件商品。'
  return JSON.stringify({ view: v ? v.getClassName() : null, model: v && v.model ? v.model.getClassName() : null, spec: v && v.model ? v.model.specification : null })
})()
