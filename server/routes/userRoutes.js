const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/login').post(usersController.loginUser)
router.route('/all').get(usersController.getAllUsers)

router.route('/register').post(usersController.registerUser)
router.route('/').patch(usersController.updateUser)
module.exports = router    