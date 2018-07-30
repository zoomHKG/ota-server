const path = require('path')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const routes = require('../routes')
const { methodNotAllowed, genericErrorHandler } = require('./errorHandlers')

// create a rotating write stream
const accessLogStream = rfs('access.log', {
  size: '50M',
  interval: '1d',
  path: path.join(__dirname, '../../../log')
})

module.exports = app => {
  app.locals.title = process.env.APP_NAME
  app.locals.version = process.env.APP_VERSION

  // remove x-powered-by
  app.disable('x-powered-by')
  // Add express stuff
  app.use(compression())
  app.use(helmet())
  app.use(morgan('combined', {
    stream: accessLogStream
  }))
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
