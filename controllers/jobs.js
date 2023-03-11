const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ sucess: true, count: jobs.length, jobs })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.OK).json({ sucess: true, job })
}
const getJob = async (req, res) => {
    const jobId = req.params.id
    const job = await Job.findOne({ createdBy: req.user.userId, _id: jobId })
    if (!job) {
        throw new NotFoundError(`job with id: ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const updateJob = async (req, res) => {
    const { company, position } = req.body
    const jobId = req.params.id
    if (company === "" || position === "") {
        throw new BadRequestError('company and position should not be empty')
    }
    const job = await Job.findOneAndUpdate({ createdBy: req.user.userId, _id: jobId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`job with id: ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({ success: true, job })
}
const deleteJob = async (req, res) => {
    const jobId = req.params.id
    const job = await Job.findOneAndRemove({ createdBy: req.user.userId, _id: jobId })
    if (!job) {
        throw new NotFoundError(`job with id: ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({ success: true, msg: `job with id: ${jobId} deleted` })
}

module.exports =
{
    getAllJobs, getJob, createJob, deleteJob, updateJob
}
