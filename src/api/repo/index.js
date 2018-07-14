const express = require('express')
const repo = require('./repo.controller')

const router = express.Router()

router.get('/', repo.getApps)
router.get('/:project', repo.getApp)

module.exports = router
