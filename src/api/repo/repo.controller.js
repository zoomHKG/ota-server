const system = require('../../../system')
const Boom = require('boom')

const repo = system.getRepo()

exports.getRepo = () =>
  new Promise((resolve, reject) => {
    resolve(repo.get())
  })

exports.getProjects = query =>
  new Promise((resolve, reject) => {
    if (query.search) {
      repo
        .search(query.search)
        .then(data => resolve(data))
        .catch(err => reject(Boom.failedDependency(err.message)))
    } else {
      resolve(repo.getProjects())
    }
  })

exports.getProject = (project) =>
  new Promise((resolve, reject) => {
    const proj = repo.getProject(project)
    if (proj) {
      resolve({
        name: project,
        ...proj
      })
    } else {
      reject(Boom.notFound('Project not found'))
    }
  })

exports.update = () =>
  new Promise((resolve, reject) => {
    repo
      .update()
      .then(data => {
        const projects = Object.keys(data).map(p => ({
          name: p,
          ...data[p]
        }))
        resolve(projects)
      })
      .catch(err => reject(err))
  })
