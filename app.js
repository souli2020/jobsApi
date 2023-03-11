const express = require('express')
require('express-async-errors')
require('dotenv').config()
const connectDB = require('./db/connect')
const port = process.env.PORT || 3000

const app = express()
//extra security middleware
const helmet = require('helmet')
const xssClean = require('xss-clean')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
//routes
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const authentication = require('./middleware/authentification')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

//middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xssClean())

//routes

app.use('/api/v2/auth', authRouter)
app.use('/api/v2/jobs', authentication, jobsRouter)

// app.use(errorHandlerMiddleware)
// app.use(notFoundMiddleWare)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server listening at port :${port}`))

    } catch (error) {
        console.log(error)
    }

}
start()
