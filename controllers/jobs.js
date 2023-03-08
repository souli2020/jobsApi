const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ jobs })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.OK).json({ job })
}
const getJob = (req, res) => {
    res.status(StatusCodes.OK).send('get single job')
}
const updateJob = (req, res) => {
    res.status(StatusCodes.OK).send('update job by id ')
}
const deleteJob = (req, res) => {
    res.status(StatusCodes.OK).send('delete job by id ')
}

module.exports =
{
    getAllJobs, getJob, createJob, deleteJob, updateJob
}
