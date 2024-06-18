const Task = require('../models/task')
const AsyncWrapper = require('../middleware/AsyncWrapper')
const {CreateCustomError}=require('../Errrors/CustomErrros')



//Create task function  to create task
const CreateTask = async (req,res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({msg:'Task Added Successfully!',Task:task})
    
   }


//Get all tasks from database
const GetAllTasks  = AsyncWrapper(async (req,res)=>{
   const tasks = await Task.find({})
   if(!tasks){
    return next(CreateCustomError("No task found!",404))
   }
     res.status(201).json({msg:'Tasks found Sucessfully!',tasks})
    
   })



//Edit the selected task
const EditTask = AsyncWrapper(async (req,res,next)=>{
    const {id:TaskID} = req.params
        // const task = await Task.findOne({_id:req.params.id})
        const task = await Task.findOneAndUpdate({_id:TaskID},req.body,{
            runValidators:true,
            new:true
        })
            if(!task){
                return next(CreateCustomError("No task with this id",404))
             }
          res.status(201).json({msg:'Task edited successfully!',task})
  

   })


//Get a single task
const GetSingleTask = AsyncWrapper(async (req,res)=>{
        const {id:TaskID} = req.params
        // const task = await Task.findOne({_id:req.params.id})
        const task = await Task.findOne({_id:TaskID})
    
        if(!task){
            return next(CreateCustomError("No task with this id",404))
        }
        res.status(201).json({msg:'Task found sucessfully!',task})
    
     
   })


//Delete the selected task 
const DeleteTask = AsyncWrapper(async (req,res)=>{
        const {id:TaskID} = req.params
        // const task = await Task.findOne({_id:req.params.id})
        const task = await Task.findOne({_id:TaskID})
        await task.deleteOne()
        if(!task){
            return next(CreateCustomError("No task with this id",404))
        }
        res.status(201).json({msg:`Task Deleted sucessfully!`,task})
   })


//exporting all modules.
module.exports= {
    GetAllTasks,
    EditTask,
    CreateTask,
    DeleteTask,
    GetSingleTask
    
}