const express = require('express')
const status = require('./status.controller')
// const system = require('../../../system')

// const logger = system.getLogger()
const router = express.Router()

router.get('/', status.getCpuInfo)

module.exports = router
