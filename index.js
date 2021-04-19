const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const log4js = require('log4js')
const session = require('express-session')
const ExamController = require('./contoller/ExamController')

const logger = log4js.getLogger()
// Configuring Logger to be info
logger.level = 'info'

// Port number
const port = 5000

logger.info('Server Available at Port: ' + port)

// Middleware to use the encoded request body
app.use(bodyParser.urlencoded({ extended: false }))

// Routing the '/login' path
app.get('/login',)

// Routing the '/exam' path
app.use('/exam', ExamController)

// Handling 404 Requests
app.use(function (req, res) {
    logger.info('404 error... Page not found')
    res.json({
        status: '404',
        description: 'Page Not Found'
    })
    res.end()
})

// Setting the express app to listen to a port
app.listen(port)