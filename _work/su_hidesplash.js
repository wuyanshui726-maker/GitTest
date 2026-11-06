(async function () {
  try {
    const fs = require('fs')
    const els = document.querySelectorAll('.splash-screen')
    els.forEach(e => e.remove())
    await new Promise(r => setTimeout(r, 1200))
    const win = require('electron').remote.getCurrentWindow()
    const img = await win.webContents.capturePage()
    fs.writeFileSync('C:/Users/屋檐水/Desktop/GitTest/_work/cap_nosplash.png', img.toPNG())
    return JSON.stringify({ removed: els.length, splashLeft: document.querySelectorAll('.splash-screen').length })
  } catch (e) { return 'ERR ' + e.stack }
})()
