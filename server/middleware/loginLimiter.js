const rateLimit = require('express-rate-limit')


const {logEvents} = require('./logger')
const { options } = require('../routes/bookRoutes')

const loginLimiter = rateLimit({
    windowMs : 60*1000,
    max: 5,
    message: {
        message:'Too many atempts, try again after 1 min'
    },
    handler: (req,res,next,options) => {
        logEvents(`Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}` ,'Error.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true,
    legacyHeaders:false

    
})

module.exports = loginLimiter