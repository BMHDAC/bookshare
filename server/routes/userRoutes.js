const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')
router.route('/register').post(usersController.registerUser)
module.exports = router    