const system = require('../../../system')
const repo = system.getRepo()

exports.getApp = (req, res) => {
  const proj = repo.getProject(req.params.project)
  // TODO: send file from proj.url
  res.send({
    success: true,
    data: proj
  })
}
