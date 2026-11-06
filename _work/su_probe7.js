(function () {
  try {
    const area = document.getElementById('diagram-area').getBoundingClientRect()
    const out = []
    document.querySelectorAll('div, img, canvas').forEach(function (d) {
      const r = d.getBoundingClientRect()
      if (r.width > 500 && r.height > 400 && r.left >= area.left - 50) {
        out.push([d.tagName, d.id, (d.className || '').toString().slice(0, 40), Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height), getComputedStyle(d).backgroundColor, getComputedStyle(d).zIndex, getComputedStyle(d).opacity])
      }
    })
    return JSON.stringify(out.slice(0, 25))
  } catch (e) { return 'ERR ' + e.stack }
})()
