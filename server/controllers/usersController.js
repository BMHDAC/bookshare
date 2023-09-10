const User = require('../models/User')
const asycnHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const getAllUsers = asycnHandler(async (req,res) => {
    const users = await User.find().lean()

    if(!users) {
        return res.status(400).json({message:"no users found"})
    }
    res.json(users)
    

})
const registerUser = asycnHandler (async (req,res) => {
    const {username,email, password,firstname,lastname} = req.body

    if(!email ||! password||!username) {
        return res.status(401).json({error:"Required more information"})
    }

    const duplicate = await User.findOne({email}).lean().exec()

    if(duplicate) {
        return res.status(400).json({error:'An account with this email is already existed'})
    }

    const hashedPwd = await bcrypt.hash(password,10)

    const userObject = {username, email, "password" : hashedPwd, firstname,lastname}

    const newuser = await User.create(userObject)

    if(newuser) {
        res.status(201).json({message:`New user ${username} created`})
    } else {
        res.status(404).json({error:'Invalid data'})
    }
})


module.exports = {getAllUsers,registerUser}