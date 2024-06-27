const Task = require('../models/task.models')
const AsyncWrapper = require('../middleware/AsyncWrapper')
const {CreateCustomError}=require('../Errrors/CustomErrros')
const {StatusCodes} = require('http-status-codes')


//Create task function  to create task
const GetMyTask = async (req,res)=>{
    const task = await Task.find({createdBy:req.user.UserId})
    if(!task){
       return res.status(StatusCodes.NOT_FOUND).json({msg:'No Tasks Found!'})
    }
    res.status(StatusCodes.OK).json({msg:'Tasks found sucessfully!',task})

}
const AddMyTask = async (req,res)=>{
    req.body.createdBy = req.user.UserId
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'Tasks added sucessfully!',task})
}


//update the task of the user
const UpdateMyTask = async (req,res)=>{
    const {
        body:{name,completed},
        user:{UserId},
        params:{id:taskId}
    } =req

    const task = await Task.findByIdAndUpdate({_id:taskId,createdBy:UserId},req.body,{new:true,runValidators:true})
    if(!name || !completed){
     return res.status(StatusCodes.NOT_FOUND).json({msg:'please enter the valid credentials!'})
    }
    if(!task){
        return res.status(StatusCodes.NOT_FOUND).json({msg:'No task found!'}) 
    }
    res.status(StatusCodes.CREATED).json({msg:'Tasks updated sucessfully!',task})
}


//Get the single task of the user
const Singletask = async ( req,res)=>{
    const {
        body:{name,completed},
        user:{UserId},
        params:{id:taskId}
    } =req 

    const task = await Task.findById({_id:taskId,createdBy:UserId})
    if(!task){
     return res.status(StatusCodes.NOT_FOUND).json({msg:'No task found!'})
    }
    res.status(StatusCodes.OK).json({msg:'Tasks found sucessfully!',task})
}

//Delete a task of the user
const DeleteMyTask = async ( req,res)=>{
    const {
        body:{name,completed},
        user:{UserId},
        params:{id:taskId}
    } =req

    const task = await Task.findByIdAndDelete({_id:taskId,createdBy:UserId})
    if(!task){
     return res.status(StatusCodes.OK).json({msg:'No task found!'})
    }
    res.status(StatusCodes.OK).json({msg:'Tasks deleted sucessfully!',task})
}


module.exports ={
    GetMyTask,
    AddMyTask,
    UpdateMyTask,
    Singletask, 
    DeleteMyTask
}
