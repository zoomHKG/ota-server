const { repository } = require('../../config')
const rp = require('request-promise')
const algoliasearch = require('algoliasearch')

// const system = require('../index.js')

// const logger = system.getLogger()

class Repository {
  constructor (props) {
    this.props = props
    this.projects = null
    this.searchClient = algoliasearch('WXINO9XF4F', '7a379b38111a8560eba67a5784e5e59c')
    this.index = this.searchClient.initIndex('iot-apps')
  }

  update () {
    return new Promise((resolve, reject) => {
      rp(repository.url)
        .then(res => {
          try {
            res = JSON.parse(res)
            this.projects = Object.keys(res).map(p => ({
              name: p,
              ...res[p]
            }))
            // index projects to algolia
            this.index
              .clearIndex()
              .then(() =>
                this.index
                  .addObjects(this.projects)
              )
              .then(content => {
                // configure search
                this.index.setSettings({
                  'searchableAttributes': [
                    'name'
                  ]
                })
              })
              .catch(() => this.index = null)
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
      return this.projects.find(p => p.name === project)
    }
  }

  // TODO: improve local search
  localSearch (project) {
    return this.projects.filter(p => p.name.includes(project) )
  }

  search (project) {
    return new Promise((resolve, reject) => {
      // if algolia search available, search on algolia
      if (this.index) {
        this.index
          .search(project)
          .then(data => resolve(data.hits || []))
          .catch(err => resolve(this.localSearch(project)))
      } else {
        resolve(this.localSearch(project))        
      }
    })
  }
}

module.exports = Repository
