(function () {
  ;['sidebar', 'navigator'].forEach(function (pid) {
    var el = document.getElementById(pid)
    if (el) el.style.display = ''
  })
  var content = document.querySelector('.content')
  var holder = document.querySelector('.content-holder')
  if (content) { content.style.left = '200px'; content.style.width = '780px' }
  if (holder) { holder.style.width = '750px' }
  var area = document.getElementById('diagram-area')
  if (area) area.style.overflow = ''
  return 'restored'
})()
