const express = require('express')
const router = express.Router()
const {login, register} = require('../controllers/loginControllers')

router.post('/login', login)
router.post('/resgister', register)

module.exports =  router