const compression = require('compression')
const bodyParser = require('body-parser')

module.exports = app => {
  // remove x-powered-by
  app.disable('x-powered-by')
  // Add express stuff
  app.use(compression())
  app.use(
    bodyParser.json({
      limit: '20mb'
    })
  )

  // Fix for corss origin issue:
  // TODO: add whitelisting so that it can be pushed to producion for testing later
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })
}
