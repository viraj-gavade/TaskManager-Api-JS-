const express = require('express')
const { register, login } = require('../controllers/logins.controllers')


const UserRouter = express.Router()

// UserRouter.route('/myprofile').get(GetMyProfile)
UserRouter.route('/signup').post(register).get((req,res)=>{
    res.send('this is test route')
})
UserRouter.route('/login').post(login).get((req,res)=>{
    res.send('this is test route')
}
)


module.exports = UserRouter