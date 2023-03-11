const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong please try later"

    }
    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }
    if (err.name === "CastError") {
        customError.msg = `We can't find the job requested, The id: ${err.value} is not valid`
        customError.statusCode = 400

    }
    if (err.name === "ValidationError") {
        const msg = Object.values(err.errors).map(item => item.message).join(' & or ')
        customError.msg = ` ${msg}`
        customError.statusCode = 400
    }
    if (err.code && err.code === 11000) {

        // customError.msg = ` duplicated value!  the ${Object.values(err.keyValue)} Already exists!`;
        customError.msg = ` duplicated value for the  email field!`
        customError.statusCode = 400

    }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.statusCode).json({ code: customError.statusCode, msg: customError.msg })

}

module.exports = errorHandlerMiddleware