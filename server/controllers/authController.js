const asycnHandler = require('express-async-handler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const login= asycnHandler(async (req,res) =>{
    const {email,password} = req.body

    if(!email, !password) {
        return res.status(400).json({error: 'All field are required'})
    }

    const foundUser = await User.findOne({email}).exec()

    if(!foundUser) {
        return res.status(401).json({error:"Unauthorized"})
    }

    const matchedPwd = await bcrypt.compare(password, foundUser.password)

    if(!matchedPwd ) return res.status(401).json({error:"Unauthorized"})

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username":foundUser.username,
                "email":foundUser.email,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1m'}
    )

    const refreshToken = jwt.sign(
        {"email":foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
    )

    res.cookie('jwt',refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge: 7*24*60*60*1000
    })

    res.json({accessToken})

})

const refresh =(req,res) => {

    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({error:'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,

        asycnHandler(async(err,decoded) => {
            if(err) return res.status(403).json({error:'Forbidden'})
            const foundUser = await User.findOne({email:decoded.email}).exec()
            if(!foundUser) return res.status(401).json({message:'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username":foundUser.username,
                        "email":foundUser.email,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            )
            res.json({accessToken})
        })
    )
}

const logout = asycnHandler(async(req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
})

module.exports ={
    login,
    refresh,
    logout
}