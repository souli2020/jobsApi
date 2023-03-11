const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'must provide a name'],
        trim: true,
        minLength: 6,
    },
    email: {
        type: String,
        require: [true, 'must provide a email'],
        trim: true,
        minLength: 6,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        require: [true, 'must provide a password'],
        trim: true,
        minLength: 6,
    }
})

//hash the password before saving the document

UserSchema.pre('save', async function (next) {
    //point to th document using this keyword
    const user = this;
    //only hash if password is modified

    //     if (!user.isModified('password')) {
    //         return next()
    //     }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    //replace the text password
    user.password = hashedPassword
    next()
})
//create  schema methods to create jwt token
UserSchema.methods.createJwt = async function () {
    const user = this
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    return token
}
//compare the hashed password with the provided password when login

UserSchema.methods.comparePassword = async function (loginPassword) {
    const user = this
    const isMatch = await bcrypt.compare(loginPassword, user.password)
    return isMatch
}


module.exports = mongoose.model('User', UserSchema)
