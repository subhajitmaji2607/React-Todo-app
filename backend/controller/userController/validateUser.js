const joi = require('joi');

exports.validate = (req,res,next)=>{
    const joiSchema = joi.object({

        first_name : joi.string()
                        .min(3)
                        .max(30)
                        .required(),

        last_name : joi.string()
                       .min(1)
                       .max(30)
                       .required(),

        email : joi.string()
                   .email()
                   .min(5)
                   .max(30)
                   .required(),

        password: joi.string()
                     .min(8)
                     .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
                     .required(),

        mobile_no : joi.string()
                       .length(10)
                    //    .pattern(/((\+*)((0[ -]+)*|(91 )*)(\d{12}+|\d{10}+))|\d{5}([- ]*)\d{6}/)
                       .required(),             
        
    }).options({abortEarly : false})

    let response = joiSchema.validate(req.body)
    
    if(response.error){
        // console.log(response.error.details)
        return res.status(403).json(response.error.details)
    }
    else{
        next();
    }
}
