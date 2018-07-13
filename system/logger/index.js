require('../global')
const winston = require('winston')
const config = require('./config')

module.exports = () => {
  if (global.appObjectStore &&
    global.appObjectStore.logger.infoLogger) {
    return global.appObjectStore.logger.infoLogger
  }
  const infoLogger = winston.createLogger({
    transports: [
      new (winston.transports.File)(config),
      new (winston.transports.Console)({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ]
  })
  return infoLogger
}
