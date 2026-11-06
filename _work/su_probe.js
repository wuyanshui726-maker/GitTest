(function () {
  try {
    const d = app.diagrams.getCurrentDiagram()
    return JSON.stringify({
      tabs: document.querySelectorAll('.diagram-tab').length,
      canvas: !!document.getElementById('diagram-canvas'),
      bodyw: document.body.clientWidth,
      bodyh: document.body.clientHeight,
      current: d ? d.name : null,
      views: d ? d.ownedViews.length : 0,
      tabTitles: Array.from(document.querySelectorAll('.tab-item, .diagram-tab, .tab')).map(e => e.textContent.trim()).slice(0, 20),
      editors: document.querySelectorAll('.diagram-editor').length,
      zoom: app.diagrams.getZoomLevel ? app.diagrams.getZoomLevel() : null,
      visible: document.visibilityState
    })
  } catch (e) {
    return 'ERR ' + e.stack
  }
})()
