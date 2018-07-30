const express = require('express')
const ota = require('./ota.controller')

const router = express.Router()

/**
 * GET /api/ota/:project
 */
router.get('/:project', ota.getApp)

module.exports = router
