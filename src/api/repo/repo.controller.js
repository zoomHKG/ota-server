const system = require('../../../system')
const Boom = require('boom')

const repo = system.getRepo()

exports.getApps = (req, res) => {
  res.send({
    data: repo.get()
  })
}

exports.getApp = (req, res, next) => {
  const proj = repo.getProject(req.params.project)
  if (proj) {
    res.send({
      data: proj
    })
  } else {
    next(Boom.notFound('Project not found'))
  }
}

exports.update = (req, res, next) => {
  repo
    .update()
    .then(data => {
      res.send({
        data
      })
    })
    .catch(error => {
      next(error)
    })
}
