(function () {
  try {
    app.project.load('C:/Users/屋檐水/Desktop/GitTest/_work/staruml_model.mdj')
    return 'loaded ' + app.project.getFilename()
  } catch (e) { return 'ERR ' + e.stack }
})()
