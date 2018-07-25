const system = require('../../system')
const error = require('./error')
const swagger = require('./swagger')

const logger = system.getLogger()

const errorHander = {
  handleError: error => {
    return logger.error(error)
  }
}

module.exports = {
  errorHander,
  swagger,
  error
}
