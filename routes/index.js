'use strict'
const express = require('express')
const router = express.Router()
const passport = require('../configuration/passport')
const errorHandler = require('../middleware/errorHandler')

const users = require('../controllers/users')
const queries = require('../controllers/queries')

router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to TYBA APP API!'
}))

// user registration
router.post('/api/users/register', users.create)

// user authentication
router.post('/api/authenticate', users.authenticate)

router.use(passport.authenticate('jwt', { session: false }))

// queries routes
router.get('/api/weather/:cityName', queries.getWeather)
router.get('/api/population/:cityName', queries.getPopulation)
router.post('/api/queries', queries.create)
router.get('/api/users/:userId/queries', queries.getQueries)

// handle http errors
router.use(errorHandler)

module.exports = router
