const express = require('express')

const router = express.Router()

const bookController = require('../controllers/booksController')

router.route('/:bookId').get(bookController.downloadBookById)
 
module.exports= router