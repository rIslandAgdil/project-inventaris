const express = require('express')
const router = express.Router()
const {login, register} = require('../controllers/loginControllers')

router.get('/login', login)
router.get('/resgister', register)