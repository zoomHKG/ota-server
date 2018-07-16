const system = require('../../../system')
const repo = system.getRepo()
const rp = require('request-promise')

exports.getApp = (req, res) => {
  let proj = repo.getProject(req.params.project)
  let fileName = proj.url.split('/').pop()
  console.log(proj.url)
  rp
    .get(proj.url)
    .then(res => {
      console.log(Object.keys(res))
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
