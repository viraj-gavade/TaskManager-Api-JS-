const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({

    username:{
    type:String,
    required:[true,'You must enter the username'],
    unique:true
    },
    name:{
    type:String,
    required:[false,'You must enter the username'],
    },

    email:{
    type:String,
    required:[true,'You must enter the email'],
    match:[/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,'Please provide a valid username'],
    unique:true
    },

    password:{
    type:String,
    required:[true,'You must enter the username'],
    },
})

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.checkpassword = async function(userpass){
    const match = await bcrypt.compare(userpass,this.password)
    return match
    
}
UserSchema.methods.signtoken = async function(){
    return jwt.sign({UserId:this._id,Username:this.name},process.env.JWT_SECRTE,{expiresIn:process.env.JWT_EXPIRY})
}
module.exports = mongoose.model('User',UserSchema) 