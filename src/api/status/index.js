const express = require('express')
const status = require('./status.controller')
// const system = require('../../../system')

// const logger = system.getLogger()
const router = express.Router()

router.get('/', status.status)
router.get('/cpus', status.getCpuInfo)

module.exports = router
