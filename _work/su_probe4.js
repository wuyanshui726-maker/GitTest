(function () {
  try {
    let e = document.elementFromPoint(500, 300)
    const chain = []
    while (e && chain.length < 8) {
      const r = e.getBoundingClientRect()
      chain.push([e.tagName, e.id, (e.className || '').toString().slice(0, 40), Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)])
      e = e.parentElement
    }
    return JSON.stringify(chain)
  } catch (x) { return 'ERR ' + x.stack }
})()
