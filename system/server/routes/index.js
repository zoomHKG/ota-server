const statusRoute = require('../../../src/api/status')
const repoRoute = require('../../../src/api/repo')

module.exports = app => {
  app.use('/api/status', statusRoute)
  app.use('/api/repo', repoRoute)
}
