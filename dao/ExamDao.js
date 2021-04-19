const mysql = require('sync-sql')
const conn = require('../config/MysqlUtils')
const Crypto = require('../util/Crypto')
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'info'

const adminConstants = require('../constants/AdminConstant')
const scheduleConstants = require('../constants/ScheduleConstant')
const questionConstants = require('../constants/QuestionConstant')

const INSERTION_OF_DATABASE_SUCCESSFUL = 'Insertion of Database Successful'
const DATA_RETRIEVED_SUCCESSFULLY = 'Data Retrieved Successfully'

class ExamDao {
    // Function to add the data to the database
    async addExamData (examDTO) {
        logger.info('Entering | ExamDao::addExamData')

        // Preparing the data models
        let admin = examDTO.examData
        let schedule = admin[ adminConstants.SCHEDULE ]
        let questions = schedule[ scheduleConstants.QUESTIONS ]

        mysql.mysql(conn, 'INSERT INTO schedules VALUES("' + admin[ adminConstants.ADMIN_ID ] + '","' + schedule[ scheduleConstants.SUBJECT_CODE ] + '");')

        // Iterating over the questions array
        questions.map(async question => {
            // Query to insert each question into the question table

            mysql.mysql(conn, 'INSERT INTO questions VALUES("' + schedule[ scheduleConstants.SUBJECT_CODE ] + '","' + question[ questionConstants.QUESTION ] + '","' + question[ questionConstants.OPTION_1 ] + '","' + question[ questionConstants.OPTION_2 ] + '","' + question[ questionConstants.OPTION_3 ] + '" ,"' + question[ questionConstants.OPTION_4 ] + '","' + question[ questionConstants.ANSWER ] + '");')
        })

        // Setting the success to true after execution
        examDTO.success = true

        // Setting status code to 200
        examDTO.status = 200

        // Setting the description
        examDTO.description = INSERTION_OF_DATABASE_SUCCESSFUL

        // Setting the examData to null
        examDTO.examData = null

        logger.info('Exiting | ExamDao::addExamData')
        return examDTO
    }

    async getExamData (subjectCode, examDTO) {
        logger.info('Entering | ExamDao::getExamData')
        let output = mysql.mysql(conn, 'Select question, option1, option2, option3, option4, answer from questions  where subcode="' + subjectCode + '"')

        let rows = output.data.rows

        examDTO.examData = {
            subjectCode: subjectCode,
            questions: rows
        }

        examDTO.success = true
        examDTO.status = 200
        examDTO.description = DATA_RETRIEVED_SUCCESSFULLY
        logger.info('Exiting | ExamDao::getExamData')
        return examDTO
    }
}

// Exporting ExamDao Class
module.exports = ExamDao