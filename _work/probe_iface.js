(function () {
  var proj = app.project.getProject()
  var diag = null
  ;(function walk (els) {
    (els || []).forEach(function (e) {
      if (!diag && e.getClassName && e.getClassName() === 'UMLClassDiagram' && e.name.indexOf('装饰器') === 0) diag = e
      if (e.ownedElements) walk(e.ownedElements)
      if (e.ownedViews) walk(e.ownedViews)
    })
  })(proj.ownedElements)
  if (!diag) return 'no diagram'
  var res = []
  diag.ownedViews.forEach(function (v) {
    if (v.getClassName() === 'UMLInterfaceView' || (v.model && v.model.getClassName && v.model.getClassName() === 'UMLInterface')) {
      var o = { cls: v.getClassName(), model: v.model.name }
      Object.keys(v).forEach(function (k) {
        if (k.indexOf('_') === 0) return
        var val = v[k]
        if (typeof val === 'number' || typeof val === 'boolean' || typeof val === 'string') o[k] = val
      })
      res.push(o)
    }
  })
  return JSON.stringify(res, null, 1)
})()
