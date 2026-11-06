(async function () {
  const fs = require('fs')
  const remote = require('electron').remote
  const win = remote.getCurrentWindow()
  const img = await win.webContents.capturePage()
  const png = img.toPNG()
  const out = 'C:/Users/屋檐水/Desktop/GitTest/_work/cap_electron.png'
  fs.writeFileSync(out, png)
  return JSON.stringify({ out: out, size: img.getSize(), bounds: win.getContentBounds(), scale: win.webContents.getZoomFactor(), empty: img.isEmpty() })
})()
