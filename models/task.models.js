const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must provide a task name"],
        trim:true,
        maxlength:[20,"Task name can not be larger than 20 words"],
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


module.exports=mongoose.model('Task',TaskSchema) 