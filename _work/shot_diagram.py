import sys, json, tempfile, os
sys.path.insert(0, r"c:\Users\屋檐水\Desktop\GitTest\_work")
from cdp import CDP

diagram = sys.argv[1]
out = sys.argv[2]
margin = sys.argv[3] if len(sys.argv) > 3 else "24"
maxz = sys.argv[4] if len(sys.argv) > 4 else "1.0"

js = r"""
(async function () {
  try {
    document.querySelectorAll('.splash-screen').forEach(e => e.remove())
    const names = []
    let diag = null
    ;(function walk(elems) {
      (elems || []).forEach(function (e) {
        if (e.getClassName && e.getClassName().endsWith('Diagram')) {
          names.push(e.name)
          if (e.name === %(name)s) diag = e
        }
        if (e.ownedElements) walk(e.ownedElements)
        if (e.ownedViews) walk(e.ownedViews)
      })
    })(app.project.getProject().ownedElements)
    if (!diag) return 'NO DIAGRAM ' + %(name)s + ' have ' + names.join('|')
    ;['sidebar', 'navigator'].forEach(function (pid) {
      var el = document.getElementById(pid)
      if (el) el.style.display = 'none'
    })
    var content = document.querySelector('.content')
    var holder = document.querySelector('.content-holder')
    var cw = document.documentElement.clientWidth
    if (content) { content.style.left = '0px'; content.style.width = cw + 'px' }
    if (holder) { holder.style.width = (cw - 36) + 'px' }
    app.diagrams.openDiagram(diag)
    app.diagrams.setZoomLevel(1)
    await new Promise(r => setTimeout(r, 300))
    if (app.diagrams.isGridVisible()) app.diagrams.toggleGrid()
    const areaEl = document.getElementById('diagram-area')
    areaEl.style.overflow = 'hidden'
    const ar = areaEl.getBoundingClientRect()
    const b = diag.getBoundingBox()
    const bw = b.x2 - b.x1, bh = b.y2 - b.y1
    const m = %(margin)s
    let z = Math.min((ar.width - m * 2) / bw, (ar.height - m * 2) / bh)
    z = Math.min(z, %(maxz)s)
    if (z < 0.1) z = 0.1
    app.diagrams.setZoomLevel(z)
    await new Promise(r => setTimeout(r, 400))
    app.diagrams.scrollTo((b.x1 + b.x2) / 2, (b.y1 + b.y2) / 2, false)
    await new Promise(r => setTimeout(r, 900))
    document.querySelectorAll('.splash-screen').forEach(e => e.remove())
    app.diagrams.setZoomLevel(z * 1.03)
    await new Promise(r => setTimeout(r, 300))
    app.diagrams.setZoomLevel(z)
    app.diagrams.scrollTo((b.x1 + b.x2) / 2, (b.y1 + b.y2) / 2, false)
    await new Promise(r => setTimeout(r, 1200))
    const mm = document.getElementById('minimap')
    if (mm) mm.style.display = 'none'
    const area2 = document.getElementById('diagram-area')
    const ar2 = area2.getBoundingClientRect()
    const sl = area2.scrollLeft, st = area2.scrollTop
    const z2 = app.diagrams.getZoomLevel()
    const sl2 = b.x1 * z2 - sl
    const st2 = b.y1 * z2 - st
    let rx = Math.round(ar2.left + sl2 - m)
    let ry = Math.round(ar2.top + st2 - m)
    let rw = Math.round((b.x2 - b.x1) * z2 + m * 2)
    let rh = Math.round((b.y2 - b.y1) * z2 + m * 2)
    const al = Math.round(ar2.left), at = Math.round(ar2.top)
    const aright = Math.round(ar2.right), abottom = Math.round(ar2.bottom)
    if (rx < al) { rw += rx - al; rx = al }
    if (ry < at) { rh += ry - at; ry = at }
    if (rx + rw > aright) rw = aright - rx
    if (ry + rh > abottom) rh = abottom - ry
    const win = require('electron').remote.getCurrentWindow()
    const rect = { x: rx, y: ry, width: rw, height: rh }
    await win.webContents.capturePage(rect)
    await new Promise(r => setTimeout(r, 700))
    await win.webContents.capturePage(rect)
    await new Promise(r => setTimeout(r, 700))
    const img = (await win.webContents.capturePage(rect))
    require('fs').writeFileSync(%(out)s, img.toPNG())
    return JSON.stringify({ name: diag.name, zoom: z, realZoom: app.diagrams.getZoomLevel(), box: b, area: { w: ar.width, h: ar.height }, crop: rect, scroll: { x: sl, y: st }, size: img.getSize() })
  } catch (e) { return 'ERR ' + e.stack }
})()
"""

js = js % {
    "name": json.dumps(diagram),
    "out": json.dumps(out.replace("\\", "/")),
    "margin": margin,
    "maxz": maxz,
}

f = os.path.join(r"c:\Users\屋檐水\Desktop\GitTest\_work", "_shot_tmp.js")
open(f, "w", encoding="utf-8").write(js)
cdp = CDP()
print(cdp.eval("eval(require('fs').readFileSync(%s,'utf8'))" % json.dumps(f.replace("\\", "/")), timeout_ms=60000))
