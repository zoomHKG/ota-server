const system = require('../../../system')

const repo = system.getRepo()

exports.getApps = (req, res) => {
  res.send({
    success: true,
    data: repo.get()
  })
}

/**
 * Headers :
 * {
 * "host":"192.168.2.1:4000","user-agent":"ESP8266-http-Update","connection":"close",
 * "x-esp8266-sta-mac":"84:F3:EB:4C:3D:B7","x-esp8266-ap-mac":"86:F3:EB:4C:3D:B7",
 * "x-esp8266-free-space":"2863104","x-esp8266-sketch-size":"278848",
 * "x-esp8266-sketch-md5":"1092358d7aea922e2c2af52983874b35","x-esp8266-chip-size":"4194304",
 * "x-esp8266-sdk-version":"2.2.1(cfd48f3)","x-esp8266-mode":"sketch","x-esp8266-version":"0.1.0"
 * }
 */
exports.getApp = (req, res) => {
  console.log(`Headers : ${JSON.stringify(req.headers, 2, null)}`)
  console.log(`version : ${req.headers['x-esp8266-version']}`)
  const proj = repo.getProject(req.params.project)
  if (proj) {
    if (proj.device === 'esp8266') {
      const version = req.headers['x-esp8266-version'] || 'v0.0.0'
      if (proj.version > version) {
        console.log('Update Necessary')
      }
    }
    res.send({
      success: true,
      data: proj
    })
  } else {
    res.send({
      success: false,
      error: {
        code: 401,
        message: 'Project not found'
      }
    })
  }
}

exports.update = (req, res) => {
  repo
    .update()
    .then(data => {
      res.send({
        success: true,
        data
      })
    })
    .catch(error => {
      res.send({
        success: false,
        error
      })
    })
}
