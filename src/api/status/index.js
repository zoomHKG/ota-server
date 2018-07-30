const express = require('express')
const status = require('./status.controller')
// const system = require('../../../system')

// const logger = system.getLogger()
const router = express.Router()

/**
 * GET /api/status/cpus
 */
router.get('/cpus', status.getCpuInfo)

module.exports = router
