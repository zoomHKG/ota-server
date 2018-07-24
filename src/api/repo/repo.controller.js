const system = require('../../../system')

const repo = system.getRepo()

exports.getApps = (req, res) => {
  res.send({
    data: repo.get()
  })
}

exports.getApp = (req, res) => {
  const proj = repo.getProject(req.params.project)
  if (proj) {
    res.send({
      data: proj
    })
  } else {
    res.send({
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
        data
      })
    })
    .catch(error => {
      res.send({
        error
      })
    })
}
