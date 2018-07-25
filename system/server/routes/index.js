const statusRoute = require('../../../src/api/status')
const repoRoute = require('../../../src/api/repo')
const otaRoute = require('../../../src/api/ota')

module.exports = app => {
  app.get('/', (req, res) => {
    res.json({
      app: req.app.locals.title,
      apiVersion: req.app.locals.version
    })
  })
  app.use('/api/status', statusRoute)
  app.use('/api/repo', repoRoute)
  app.use('/api/ota', otaRoute)
}
