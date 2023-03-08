const express = require('express')
const router = express.Router()

const { register, login, deleteUsers } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.delete('/users', deleteUsers)


module.exports = router
