(function () {
  var T = app.type && app.type.UMLNote
  var info = { hasType: !!T }
  if (T) {
    info.staticNames = Object.getOwnPropertyNames(T).slice(0, 80)
    info.protoNames = Object.getOwnPropertyNames(T.prototype).slice(0, 80)
  }
  // create a scratch note in first class diagram
  var proj = app.project.getProject()
  var diag = null
  ;(function walk (els) {
    (els || []).forEach(function (e) {
      if (!diag && e.getClassName && e.getClassName() === 'UMLClassDiagram') diag = e
      if (e.ownedElements) walk(e.ownedElements)
      if (e.ownedViews) walk(e.ownedViews)
    })
  })(proj.ownedElements)
  if (!diag) { info.err = 'no class diagram'; return JSON.stringify(info) }
  var v = app.factory.createModelAndView({
    id: 'UMLNote', parent: diag._parent || diag, diagram: diag,
    x1: 50, y1: 50, x2: 450, y2: 150
  })
  info.newViewClass = v.getClassName()
  info.newModelClass = v.model.getClassName()
  info.newViewKeys = Object.keys(v).filter(function (k) { return k.indexOf('_') !== 0 }).slice(0, 60)
  info.newModelKeys = Object.keys(v.model).filter(function (k) { return k.indexOf('_') !== 0 }).slice(0, 60)
  info.newViewText = v.text
  v.model.name = 'TESTNOTE'
  info.afterName_viewText = v.text
  v.model.text = 'LINE1\nLINE2'
  info.afterText_viewText = v.text
  info.modelTextValue = v.model.text
  return JSON.stringify(info, null, 1)
})()
