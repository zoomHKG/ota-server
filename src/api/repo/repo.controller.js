const system = require('../../../system')
const Boom = require('boom')

const repo = system.getRepo()

exports.getRepo = () =>
  new Promise((resolve, reject) => {
    resolve(repo.get())
  })

exports.getProjects = () =>
  new Promise((resolve, reject) => {
    const proj = repo.getProjects()
    const projects = Object.keys(proj).map(p => ({
      name: p,
      ...proj[p]
    }))
    resolve(projects)
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
