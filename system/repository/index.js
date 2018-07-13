require('../global')

const Repository = require('./repo.js')

module.exports = () => {
  if (global.appObjectStore && global.appObjectStore.repo) {
    return global.appObjectStore.repo
  }
  global.appObjectStore.repo = new Repository()
  return global.appObjectStore.repo
}
