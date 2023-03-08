
const { StatusCodes } = require('http-status-codes')

const getAllJobs = (req, res) => {
    res.status(StatusCodes.OK).send('get all jobs')
}

const createJob = (req, res) => {
    res.status(StatusCodes.OK).json(req.user)
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
