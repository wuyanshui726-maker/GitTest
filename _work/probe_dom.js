(function () {
  function desc (el, depth, max) {
    if (!el || depth > max) return null
    var o = { t: el.tagName, id: el.id || '', cls: (el.className && el.className.toString) ? el.className.toString() : '' }
    var r = el.getBoundingClientRect()
    o.r = [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]
    var ch = []
    for (var i = 0; i < el.children.length; i++) ch.push(desc(el.children[i], depth + 1, max))
    if (ch.length) o.c = ch
    return o
  }
  var area = document.getElementById('diagram-area')
  var root = area
  for (var i = 0; i < 4; i++) root = root.parentElement
  return JSON.stringify(desc(root, 0, 3))
})()
