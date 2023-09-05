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
const loginUser = asycnHandler(async (req,res) => {
    
    try {
        const {email,password} = req.body
        const finduser = await User.findOne(({email})).lean().exec()
        if(!finduser) {
            return res.status(404).json({error:"No user Found"})
        }

        const matchingPwd = bcrypt.compare(password,finduser.password)


        if(!matchingPwd) {
            return res.status(400).json({error:"Wrong password"})
        }
        return res.status(200).json({message:"found user"})
    } catch(error) {
        console.log(error)
    }
})
const registerUser = asycnHandler (async (req,res) => {
    const {username,email, password,firstname,lastname} = req.body

    if(!email ||! password||!username) {
        return res.status(404).json({error:"Required more information"})
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
const updateUser = asycnHandler (async (req,res) => {
    
})

module.exports = {getAllUsers,registerUser,updateUser,loginUser}