// const { CustomAPIError } = require('../errors')

const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    
    let customError   = {
        statusCode : err.statusCode || StausCodes.INTERNAL_SERVER_ERROR,
        errorMsg : err.msg || 'Something went wrong Please try later gain!'
//     if (err instanceof CustomAPIError) {
//         return res.status(err.statusCode).json({ msg: err.message })
//     }
        
        if(err.code === 11000){
            customError.errorMsg = 'Please provide a valid name, email or password'
            custom.statusCode = 400
        }
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return  res.status(customError.statusCode).json({msg: customError.errorMsg})

}

module.exports = errorHandlerMiddleware
