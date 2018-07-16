const system = require('../../../system')
const rp = require('request-promise')
const eh = require('../../utils')

const repo = system.getRepo()

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
  const proj = repo.getProject(req.params.project)
  if (proj) {
    let version = 'v0.0.0'
    // version is sent by the ESP in request header
    // TODO: verify device type before update
    if (proj.device === 'esp8266') {
      version = req.headers['x-esp8266-version'] || 'v0.0.0'
    }
    // only update if newer version available
    if (proj.version > version) {
      const fileName = proj.url.split('/').pop()
      rp
        .get(proj.url)
        .then(res => {
          return res
        })
        .then(dat => {
          res.set('Content-Type', 'application/octet-stream')
          res.set('Content-Disposition', 'attachment; filename=' + fileName)
          res.send(Buffer.alloc(dat.length, dat, 'binary'))
        })
        .catch(err => {
          eh.handleError(err)
          res.send({
            success: false,
            error: {
              code: 404,
              message: 'Cannot fetch app binary'
            }
          })
        })
    }
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
