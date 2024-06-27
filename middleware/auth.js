const { StatusCodes } = require('http-status-codes')
const User = require('../models/users.models.js')

const jwt = require('jsonwebtoken')

const authenticate = async (req,res,next)=>{
    const AuthHeader = req.headers.authorization
    if(!AuthHeader ||! AuthHeader.startsWith('Bearer ')){
        res.status(StatusCodes.UNAUTHORIZED).json({msg:"Access token not provided"})
    }

    const token = AuthHeader.split(' ')[1]
    console.log({token})
    try {
        console.log(token)
        const payload = jwt.verify(token,process.env.JWT_SECRTE)
        req.user = {UserId:payload.UserId,Username:payload.Username}
        next()
    } catch (error) {
        console.log(error)
    }
   
} 

module.exports = authenticate
