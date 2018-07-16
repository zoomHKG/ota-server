const system = require('../../../system')

const repo = system.getRepo()

exports.getApps = (req, res) => {
  res.send({
    success: true,
    data: repo.get()
  })
}

exports.getApp = (req, res) => {
  const proj = repo.getProject(req.params.project)
  if (proj) {
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
