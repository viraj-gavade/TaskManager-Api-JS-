const { StatusCodes } = require('http-status-codes')
const User = require('../models/users.models')
const bcrypt = require('bcryptjs')



//User Login fucntionality

const login = async(req,res)=>{
    console.log(req.body)
    const {username,password} = req.body
    if(!username||!password){
       return  res.status(StatusCodes.BAD_REQUEST).json({msg:'Please enter the email and password'})
    }
    const user = await User.findOne({username})
    if(!user){
        return  res.status(StatusCodes.BAD_REQUEST).json({msg:'User does not exists'})  
    }
    const ismatch = await user.checkpassword(password)
    if(!ismatch){
        return  res.status(StatusCodes.BAD_REQUEST).json({msg:'Incorrect Password!'})  

    }
    const token = await user.signtoken()
    res.status(StatusCodes.OK).json({msg:'Logged in Successfully!',token})
}


const register = async (req,res)=>{
    const user = await User.create({...req.body})
    
    const token = await user.signtoken()
    res.status(StatusCodes.OK).json({msg:'User Registered Successfully!',token})
}

module.exports = {
    login, 
    register
}