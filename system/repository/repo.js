const { repository } = require('../../config')
const rp = require('request-promise')
// const system = require('../index.js')

// const logger = system.getLogger()

class Repository {
  constructor (props) {
    this.props = props
    this.repo = null
  }

  update () {
    return new Promise((resolve, reject) => {
      rp(repository.url)
        .then(res => {
          try {
            this.repo = JSON.parse(res)
            resolve(this.repo)
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
    return this.repo
  }

  getProject (project) {
    if (this.repo) {
      return this.repo[project]
    }
  }
}

module.exports = Repository
