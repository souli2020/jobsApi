const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError, BadRequestError } = require('../errors')

const register = async (req, res) => {
    const user = await User.create(req.body)

    const token = await user.createJwt()
    res.status(StatusCodes.OK).json({ user, token })

}

const login = async (req, res) => {
    const { email, password } = req.body
    //validate the email and the password
    if (!email || !password) {
        throw new BadRequestError('please provide an email and password')
    }
    //check if the user exist by finding the email
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Please register you dont have an account!')
    }
    //compare the hashed password with the login password

    const isCorrectPassword = await user.comparePassword(password)
    if (!isCorrectPassword) {
        throw new UnauthenticatedError('WRONG PASSWORD')
    }
    const token = await user.createJwt()

    res.status(StatusCodes.OK).json({ user, token })

}


//helper
const deleteUsers = async (req, res) => {
    const user = await User.deleteMany({})
    res.status(StatusCodes.OK).send('all users deleted')
}
module.exports = { register, login, deleteUsers }
