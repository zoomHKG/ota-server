const express = require('express')
// const system = require('../../../system')

// const logger = system.getLogger()
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    data: 'OK'
  })
})

module.exports = router
