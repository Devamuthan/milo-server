const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const log4js = require('log4js')
const ExamDTO = require('../dto/ExamDTO')

// Setting the logger level to info
const logger = log4js.getLogger()
logger.level = 'info'

const ExamServices = require('../services/ExamServices')
const examServices = new ExamServices()

// Middleware to use the encoded request body
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// Creating an object of ExamDTO class
let examDTO = new ExamDTO()

let corsConfig = { /*origin: 'http://localhost:3000/'*/}

router.use(cors(corsConfig))

// Catching the route '/:subjectCode' on get request => get the data of the specific subject
router.get('/:subjectCode', (req, res) => getExamData(req, res))

// Catching the route '/' on post request => add a question paper into the database
router.post('/',(req, res) => addExamData(req, res))

// Defining the function that handles the get route
let getExamData = async (req, res) => {
    logger.info('Entering | ExamController::getExamData')

    // Calling the getExamData function in Sevice Layer
    examDTO = await examServices.getExamData(req, examDTO)

    // Returning the examDTO
    res.json(examDTO.json)
    logger.info('Exiting | ExamController::getExamData')

    // Ending the reponse
    res.end()
}

// Defining the function that handles the post route
let addExamData = async (req, res) => {
    logger.info('Entering | ExamController::addExamData')

    console.log(req.body)
    // Calling the addExamData function in service layer
    examDTO = await examServices.addExamData(req.body, examDTO)

    // Returning the examDTO
    res.json(examDTO.json)
    logger.info('Exiting | ExamController::addExamData')

    // Ending the response
    res.end()
}

// Exporting the express router
module.exports = router