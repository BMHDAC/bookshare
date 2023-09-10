const express = require('express')
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

const usersController = require('../controllers/usersController')

const router= express.Router()



router.route('/login').post(loginLimiter,authController.login)

router.route('/refresh').get(authController.refresh)

router.route('/logout').post(authController.logout)
router.route('/register').post(usersController.registerUser)

module.exports = router