(async function () {
  try {
    const area = document.getElementById('diagram-area').getBoundingClientRect()
    let e = document.elementFromPoint(area.left + 600, area.top + 600)
    const chain = []
    while (e && chain.length < 6) {
      const r = e.getBoundingClientRect()
      chain.push([e.tagName, e.id, (e.className || '').toString().slice(0, 50), Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)])
      e = e.parentElement
    }
    app.diagrams.setZoomLevel(0.32)
    await new Promise(r => setTimeout(r, 500))
    const z = app.diagrams.getZoomLevel()
    return JSON.stringify({ chain: chain, zoomAfter: z, area: { l: area.left, t: area.top, w: area.width, h: area.height } })
  } catch (x) { return 'ERR ' + x.stack }
})()
