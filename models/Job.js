const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'must provide a company']
    },
    position: {
        type: String,
        required: [true, 'must provide a position']
    },
    status: {
        type: String,
        default: 'pending'

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',

    }


}, { timestamps: true })


module.exports = mongoose.model('Job', JobSchema)