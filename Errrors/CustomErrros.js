class CustomAPIError extends Error{
    constructor(message,statuscode){
    super(message)
    this.statuscode = statuscode
}
}

const CreateCustomError = (msg,statuscode)=>{
    return new CustomAPIError(msg,statuscode)
}

module.exports={CustomAPIError,CreateCustomError}