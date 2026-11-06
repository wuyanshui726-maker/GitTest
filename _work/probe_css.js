(function () {
  function st (id) {
    var el = id ? document.getElementById(id) : document.querySelector('.main-view')
    if (!el) return null
    var c = getComputedStyle(el)
    var r = el.getBoundingClientRect()
    return { id: id, r: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], display: c.display, position: c.position, width: c.width, left: c.left, right: c.right, flex: c.flex, overflow: c.overflow }
  }
  var res = [st(null)]
  var content = document.querySelector('.content')
  if (content) {
    var c = getComputedStyle(content)
    var r = content.getBoundingClientRect()
    res.push({ id: '.content', r: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], display: c.display, position: c.position, width: c.width, left: c.left, flex: c.flex })
  }
  var holder = document.querySelector('.content-holder')
  if (holder) {
    var c2 = getComputedStyle(holder)
    var r2 = holder.getBoundingClientRect()
    res.push({ id: '.content-holder', r: [Math.round(r2.left), Math.round(r2.top), Math.round(r2.width), Math.round(r2.height)], display: c2.display, position: c2.position, width: c2.width, left: c2.left })
  }
  res.push(st('sidebar'))
  res.push(st('navigator'))
  res.push(st('diagram-area'))
  return JSON.stringify(res, null, 1)
})()
