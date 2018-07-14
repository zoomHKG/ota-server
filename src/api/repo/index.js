const express = require('express')
const repo = require('./repo.controller')

const router = express.Router()

router.get('/', repo.getApps)
router.get('/list', repo.getApps)
router.get('/update', repo.update)
router.get('/project/:project', repo.getApp)

module.exports = router
