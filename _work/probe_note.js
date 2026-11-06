(function () {
  var proj = app.project.getProject()
  var out = []
  function walk (els, depth) {
    (els || []).forEach(function (e) {
      if (e.getClassName && e.getClassName() === 'UMLNoteView') {
        var m = e.model
        out.push({
          viewClass: e.getClassName(),
          viewText: e.text,
          modelClass: m ? m.getClassName() : null,
          modelName: m ? m.name : null,
          modelText: m ? m.text : null,
          attrs: m && m.getClassName() ? Object.keys(m).filter(function (k) { return k.indexOf('_') !== 0 }).slice(0, 40) : []
        })
      }
      if (e.ownedElements) walk(e.ownedElements, depth + 1)
      if (e.ownedViews) walk(e.ownedViews, depth + 1)
    })
  }
  walk(proj.ownedElements, 0)
  return JSON.stringify(out, null, 1)
})()
