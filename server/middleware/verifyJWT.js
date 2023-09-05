const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers.authorization||req.authHeader.Authorization

    if(!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({error:'Unauthorized'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,

        (err,decoded) => {
            if(err) return res.status(403).json({error:'Forbidden'})

            req.email = decoded.UserInfo.email
            req.username = decoded.UserInfo.username
            next()
        }
    )

}

module.exports = verifyJWT