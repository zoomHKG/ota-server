const express = require('express')
const repo = require('./repo.controller')

const router = express.Router()

/**
 * GET /api/repo
 */
router.get('/', (req, res, next) => {
  repo
    .getRepo()
    .then(data => res.json({ data }))
    .catch(err => next(err))
})

/**
 * GET /api/repo/update
 */
router.get('/update', (req, res, next) => {
  repo
    .update()
    .then(data => {
      res.json({ data })
    })
    .catch(error => {
      next(error)
    })
})

/**
 * GET /api/repo/projects
 */
router.get('/projects', (req, res, next) => {
  repo
    .getProjects(req.query)
    .then(data => res.json({ data }))
    .catch(err => next(err))
})

/**
 * GET /api/repo/project/:project
 */
router.get('/projects/:project', (req, res, next) => {
  repo
    .getProject(req.params.project)
    .then(data => res.json({ data }))
    .catch(err => next(err))
})

module.exports = router
