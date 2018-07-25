const rootRoute = require('../../../src/api')
const statusRoute = require('../../../src/api/status')
const repoRoute = require('../../../src/api/repo')
const otaRoute = require('../../../src/api/ota')

module.exports = app => {
  app.use('/', rootRoute)
  app.use('/api/status', statusRoute)
  app.use('/api/repo', repoRoute)
  app.use('/api/ota', otaRoute)
}
