(async function () {
  try {
    const fs = require('fs')
    const remote = require('electron').remote
    const win = remote.getCurrentWindow()
    win.setAlwaysOnTop(true, 'screen-saver')
    if (win.webContents.setBackgroundThrottling) win.webContents.setBackgroundThrottling(false)
    win.show()
    win.focus()
    await new Promise(r => setTimeout(r, 2500))
    const img = await win.webContents.capturePage()
    fs.writeFileSync('C:/Users/屋檐水/Desktop/GitTest/_work/cap_fix.png', img.toPNG())
    return JSON.stringify({ size: img.getSize(), empty: img.isEmpty(), top: win.isAlwaysOnTop(), visible: win.isVisible() })
  } catch (e) { return 'ERR ' + e.stack }
})()
