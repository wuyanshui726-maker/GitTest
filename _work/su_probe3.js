(function () {
  try {
    const body = document.body
    const info = {
      bodyChildren: Array.from(body.children).map(c => c.tagName + '#' + c.id + '.' + c.className + ' ' + c.getBoundingClientRect().width + 'x' + c.getBoundingClientRect().height),
      elAt: (function () {
        const e = document.elementFromPoint(600, 300)
        return e ? e.tagName + '#' + e.id + '.' + e.className : null
      })(),
      frames: window.frames.length,
      appState: typeof app,
      working: document.querySelectorAll('.working-diagram, .diagram-editor, .tab-item').length,
      htmlHead: body.innerHTML.slice(0, 200)
    }
    return JSON.stringify(info)
  } catch (e) { return 'ERR ' + e.stack }
})()
