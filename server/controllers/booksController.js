const Book = require('../models/Book')
const asyncHandler = require('express-async-handler')

const getAllBooks = asyncHandler(async (req,res) => {
    const books = await Book.find().lean()
    if(!books) {
        return res.status(404).json({message:"No books found"})
    }

    return res.status(200).json(books)
})

const uploadBook = asyncHandler(async(req,res) => {
    const {name,author,title,uploader,file} = req.body
    const path = req.file.path
    if(!name||!title) {
        return res.status(400).json({Error:'NO BOOK'})
    }
    
 
    const newbook = {name,author,title,uploader,file,path}
    const uploadedbook = await Book.create(newbook)
    return res.status(200).json({message:"Book uploaded"})
    
})

const downloadBookById = asyncHandler(async(req,res) => {
    const foundBook = await Book.findById(req.params.bookId);

    if(!foundBook) {
        return res.status(404).json({message:"Book not found"})
    }
    await foundBook.save()

    let filename = foundBook.title +'.pdf'

    res.download(foundBook.path, filename)

})

module.exports ={uploadBook,getAllBooks,downloadBookById}