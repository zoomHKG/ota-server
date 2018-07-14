const express = require('express')
const ota = require('./ota.controller')

const router = express.Router()

// router.get('/', )
router.get('/:project', ota.getApp)

module.exports = router
