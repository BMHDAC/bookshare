const { text } = require('express')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:false
    },
    title: {
        type: String,
        required:true
    },
    uploader : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    file: {
    },
    path: {
        type:String
    }


})

module.exports = mongoose.model('Book',BookSchema)