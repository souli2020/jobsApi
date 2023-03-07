const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')


const register = async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.OK).json({ user })

}

const login = async (req, res) => {
    res.status(StatusCodes.OK).json('user logged')

}

module.exports = { register, login }
