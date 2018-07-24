const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

module.exports = app => {
  // remove x-powered-by
  app.disable('x-powered-by')
  // Add express stuff
  app.use(compression())
  app.use(cors())
  app.use(
    bodyParser.json({
      limit: '20mb'
    })
  )

  // error handlers
  app.use(genericErrorHandler)
  app.use(methodNotAllowed)
}
