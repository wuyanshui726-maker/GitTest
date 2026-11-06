(function () {
  try {
    const F = 'Arial;22;0'
    let n = 0
    function setFont (v) {
      try { v.font = F; n++ } catch (e) { }
      ;(v.subViews || []).forEach(setFont)
    }
    ;(function walk (elems) {
      (elems || []).forEach(function (e) {
        if (e.ownedViews) e.ownedViews.forEach(setFont)
        if (e.ownedElements) walk(e.ownedElements)
      })
    })(app.project.getProject().ownedElements)
    app.project.save('C:/Users/屋檐水/Desktop/GitTest/_work/staruml_model.mdj')
    return JSON.stringify({ set: n })
  } catch (e) { return 'ERR ' + e.stack }
})()
