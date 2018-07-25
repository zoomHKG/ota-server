const path = require('path')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('../routes')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

module.exports = app => {
  app.locals.title = process.env.APP_NAME
  app.locals.version = process.env.APP_VERSION

  // remove x-powered-by
  app.disable('x-powered-by')
  // Add express stuff
  app.use(compression())
  app.use(helmet())
  app.use(cors())
  app.use(
    bodyParser.json({
      limit: '20mb'
    })
  )
  app.use(express.static(path.join(__dirname, '../../../public')))
  routes(app)
  // error handlers
  app.use(genericErrorHandler)
  app.use(methodNotAllowed)
}
