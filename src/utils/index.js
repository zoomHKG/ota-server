const system = require('../../system')

const logger = system.getLogger()

const errorHander = {
  handleError: error => {
    return logger.error(error)
  }
}

module.exports.errorHander = errorHander
