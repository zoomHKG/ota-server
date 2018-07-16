const system = require('../../../system')
const rp = require('request-promise')
const eh = require('../../utils')

const repo = system.getRepo()

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
