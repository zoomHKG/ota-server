const config = require('../../config')
const http = require('http')
const express = require('express')
const app = express()

const production = process.env.NODE_ENV === 'production'

const middlewares = require('./middlewares')
const routes = require('./routes')
const system = require('../index.js')

const logger = system.getLogger()
let serverConfig

if (production) {
  serverConfig = config.server.production
} else {
  serverConfig = config.server.development
}

middlewares(app)
routes(app)

const server = {
  start: function start () {
    this.httpServer = http.createServer(app)
    this.httpServer.listen(serverConfig.port, serverConfig.ip)

    logger.info(`Server running at https://localhost:${serverConfig.port}`)
  },
  stop: function () {
    this.httpServer.close()
  },
  httpServer: null
}

server.start()

module.exports = server
