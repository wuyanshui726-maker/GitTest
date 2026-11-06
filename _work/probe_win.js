(function () {
  var win = require('electron').remote.getCurrentWindow()
  var scr = require('electron').remote.screen
  var d = scr.getPrimaryDisplay()
  var sz = d.size, ws = d.workAreaSize, sf = d.scaleFactor
  return JSON.stringify({ bounds: win.getBounds(), size: sz, workArea: ws, scaleFactor: sf, maximized: win.isMaximized(), content: [document.documentElement.clientWidth, document.documentElement.clientHeight] })
})()
