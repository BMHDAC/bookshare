require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const {logger,logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./configs/corsOptions')
const cookieParser = require('cookie-parser')
const connectDB = require('./configs/dbConnect')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3008

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)
app.use(credentials)
app.use(cors({
    origin:['http://localhost:3000']
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/', express.static(path.join(__dirname,'/public')))
app.use('/auth',require('./routes/authRoutes'))
app.use('/books',require('./routes/bookRoutes'))
app.use('/',require('./routes/uploadsRoutes'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to mongodb')
    app.listen(PORT, ( ) => {
        console.log(`Server running on Port ${PORT}`)
    })

}) 

mongoose.connection.on('error',  err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syncall}\t${err.hostname}`,'mongoErr.log')
})