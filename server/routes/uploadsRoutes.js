const express = require('express')
const upload = require('../middleware/uploader')
const router = express.Router()
const bookController = require('../controllers/booksController')




router.route('/uploads').post(upload.single('file'),bookController.uploadBook)





module.exports = router