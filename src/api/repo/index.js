const express = require('express')
const system = require('../../../system')

const repo = system.getRepo()
// const logger = system.getLogger()
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    data: repo.get()
  })
})

router.get('/:project', (req, res) => {
  res.send({
    data: repo.getProject(req.params.project)
  })
})

module.exports = router
