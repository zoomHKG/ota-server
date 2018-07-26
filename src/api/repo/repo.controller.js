const system = require('../../../system')
const Boom = require('boom')

const repo = system.getRepo()

exports.getRepo = () =>
  new Promise((resolve, reject) => {
    resolve(repo.get())
  })

exports.getProjects = () =>
  new Promise((resolve, reject) => {
    resolve(repo.getProjects())
  })

exports.getProject = (project) =>
  new Promise((resolve, reject) => {
    const proj = repo.getProject(project)
    if (proj) {
      resolve(proj)
    } else {
      reject(Boom.notFound('Project not found'))
    }
  })

exports.update = () =>
  new Promise((resolve, reject) => {
    repo
      .update()
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
