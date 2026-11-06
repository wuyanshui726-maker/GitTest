const path = require('path')
const fs = require('fs')

const electronApp = (process.type === 'renderer') ? require('electron').remote.app : require('electron').app
const configPath = path.join(electronApp.getPath('userData'), '/config.json')

function getConfigJson () {
  if (fs.existsSync(configPath)) {
    const data = fs.readFileSync(configPath, 'utf8')
    try {
      const json = JSON.parse(data)
      return json
    } catch (err) {
      console.log(err)
      return {}
    }
  }
  return {}
}

exports.getConfigJson = getConfigJson
