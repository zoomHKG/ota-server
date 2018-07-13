require('./global')
const logger = require('./logger')()

module.exports.getLogger = () => {
  // Only one logger is used for now
  const r = logger
  global.appObjectStore.logger = logger
  return r
}

module.exports.logger = logger
