const path = require('path')
const swagger = require('swagger-jsdoc')

/**
 * Swagger Definition
 */
const swaggerDefinition = {
  info: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION
  },
  basePath: '/api'
}

/**
 * Swagger Options
 */
const swaggerOptions = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '/../api/index.js'),
    path.join(__dirname, '/../api/ota/index.js'),
    path.join(__dirname, '/../api/repo/index.js'),
    path.join(__dirname, '/../api/status/index.js')
  ]
}

module.exports = swagger(swaggerOptions)
