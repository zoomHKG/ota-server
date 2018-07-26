const { repository } = require('../../config')
const rp = require('request-promise')
// const system = require('../index.js')

// const logger = system.getLogger()

class Repository {
  constructor (props) {
    this.props = props
    this.projects = null
  }

  update () {
    return new Promise((resolve, reject) => {
      rp(repository.url)
        .then(res => {
          try {
            this.projects = JSON.parse(res)
            resolve(this.projects)
          } catch (err) {
            reject(err)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get () {
    return repository
  }

  getProjects () {
    return this.projects
  }

  getProject (project) {
    if (this.projects) {
      return this.projects[project]
    }
  }
}

module.exports = Repository
