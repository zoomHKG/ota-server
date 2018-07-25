const system = require('../../../system')
const Boom = require('boom')

const repo = system.getRepo()

exports.getApps = (req, res) => {
  res.json({
    data: repo.get()
  })
}

exports.getApp = (req, res, next) => {
  const proj = repo.getProject(req.params.project)
  if (proj) {
    res.json({
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
      res.json({
        data
      })
    })
    .catch(error => {
      next(error)
    })
}
