require('./global')
const logger = require('./logger')()
const repo = require('./repository')()

module.exports.getLogger = () => {
  // Only one logger is used for now
  const r = logger
  global.appObjectStore.logger = logger
  return r
}

module.exports.getRepo = () => {
  global.appObjectStore.repo = repo
  return repo
}

module.exports.logger = logger
