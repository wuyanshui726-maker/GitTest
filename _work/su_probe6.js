(function () {
  try {
    const all = Array.from(document.querySelectorAll('div')).filter(d => {
      const r = d.getBoundingClientRect()
      return r.width > 600 && r.height > 500 && d.children.length < 4 && (d.className || '').toString().indexOf('splash') >= 0
    }).map(d => [d.className, d.style.display])
    return JSON.stringify({
      splash: document.querySelectorAll('.splash-screen').length,
      splashAll: all,
      file: app.project.getFilename(),
      cur: app.diagrams.getCurrentDiagram() ? app.diagrams.getCurrentDiagram().name : null,
      bodyChildren: Array.from(document.body.children).map(c => c.tagName + '.' + c.className).slice(0, 15)
    })
  } catch (e) { return 'ERR ' + e.stack }
})()
