const system = require('../../../system')
const repo = system.getRepo()
const rp = require('request-promise')

exports.getApp = (req, res) => {
  const proj = repo.getProject(req.params.project)
  if (proj) {
    let version = 'v0.0.0'
    // version is sent by the ESP in request header
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
          console.log(err)
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
