(function () {
  try {
    const e = require('electron')
    return JSON.stringify({
      keys: Object.keys(e),
      remote: typeof e.remote,
      remoteWin: !!(e.remote && e.remote.getCurrentWindow),
      ipc: typeof e.ipcRenderer,
      win: (function () {
        try { return !!e.remote.getCurrentWindow().webContents } catch (x) { return 'x:' + x.message }
      })()
    })
  } catch (x) { return 'ERR ' + x.stack }
})()
