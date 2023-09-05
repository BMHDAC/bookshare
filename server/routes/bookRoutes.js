const express = require('express')
const upload = require('../middleware/uploader')
const router = express.Router()
const bookController = require('../controllers/booksController')

const verifyJWT = require('../middleware/verifyJWT')
router.use(verifyJWT)

router.route('/all').get(bookController.getAllBooks)

router.route('/uploads').post(upload.single('file'),bookController.uploadBook)
router.route('/:bookId').get(bookController.downloadBookById)





module.exports = router