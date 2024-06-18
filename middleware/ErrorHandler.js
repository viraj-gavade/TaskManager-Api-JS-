 const {CustomAPIError}=require('../Errrors/CustomErrros')

const ErrorHandler = (err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statuscode).json({msg:err.message})
    }
   return res.status(500).json({msg:"Something went wrong"})
    
}

module.exports=ErrorHandler 