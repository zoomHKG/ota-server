const system = require('../../../system')

const repo = system.getRepo()

exports.getApps = (req, res) => {
  res.send({
    success: true,
    data: repo.get()
  })
}

exports.getApp = (req, res) => {
  res.send({
    success: true,
    data: repo.getProject(req.params.project)
  })
}
