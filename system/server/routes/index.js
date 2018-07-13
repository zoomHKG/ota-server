const statusRoute = require('../../../src/api/status')

module.exports = app => {
  app.use('/api/status', statusRoute)
}
