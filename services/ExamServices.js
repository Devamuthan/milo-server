const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'info'

const Admin = require('../model/Admin')
const Schedule = require('../model/Schedule')
const Question = require('../model/Question')

const adminConstant = require('../constants/AdminConstant')
const scheduleConstant = require('../constants/ScheduleConstant')
const questionConstant = require('../constants/QuestionConstant')

const ExamDao = require('../dao/ExamDao')
const examDao = new ExamDao()

// Refactoring Constants
const ADMIN_ID_IS_EMPTY = 'Admin Id is Empty'
const SUBJECT_CODE_IS_EMPTY = 'Subject Code is Empty'
const QUESTION_IS_EMPTY = 'Question is empty'
const OPTION_1_IS_EMPTY = 'Option 1 is Empty'
const OPTION_2_IS_EMPTY = 'Option 2 is Empty'
const OPTION_3_IS_EMPTY = 'Option 3 is Empty'
const OPTION_4_IS_EMPTY = 'Option 4 is Empty'
const ANSWER_IS_EMPTY = 'Answer is Empty'

// Service Layer -> Exam Services
class ExamServices {

    // Function to get a question paper
    async getExamData (req, examDTO) {
        logger.info('Entering | ExamServices::getExamData')

        examDTO.success = true
        if(req.params.subjectCode == null || req.params.subjectCode === ''){
            examDTO.success = false
            examDTO.description = SUBJECT_CODE_IS_EMPTY
            examDTO.status = 500
        }

        if( !examDTO.success ){
            logger.info('Exiting | ExamServices::getExamData')
            return examDTO
        }
        examDTO = await examDao.getExamData(req.params.subjectCode, examDTO)

        logger.info('Exiting | ExamServices::getExamData')
        return examDTO
    }

    // Function to add exam data
    async addExamData (reqBody, examDTO) {
        logger.info('Entering | ExamServices::addExamData')

        // Creating objects of data models
        let admin = new Admin()
        let schedule = new Schedule()

        // Setting the values of the models
        admin[ adminConstant.ADMIN_ID ] = reqBody[ adminConstant.ADMIN_ID ]
        admin[ adminConstant.SCHEDULE ] = schedule

        schedule[ scheduleConstant.SUBJECT_CODE ] = reqBody[ scheduleConstant.SUBJECT_CODE ]

        // Initially setting success status as true
        examDTO.success = true

        // Validating adminId
        if (admin[ adminConstant.ADMIN_ID ] == null || admin[ adminConstant.ADMIN_ID ] === '') {
            examDTO.success = false
            examDTO.description = ADMIN_ID_IS_EMPTY
        }

        // Validating subjectCode
        if (schedule[ scheduleConstant.SUBJECT_CODE ] == null || schedule[ scheduleConstant.SUBJECT_CODE ] === '') {
            examDTO.success = false
            examDTO.description = examDTO.description + ' ' + SUBJECT_CODE_IS_EMPTY
        }

        // Validating each question
        schedule[ scheduleConstant.QUESTIONS ] = reqBody[ scheduleConstant.QUESTIONS ].map(question => {
            let tempQuestion = new Question(question[ questionConstant.QUESTION ], question[ questionConstant.OPTION_1 ], question[ questionConstant.OPTION_2 ], question[ questionConstant.OPTION_3 ], question[ questionConstant.OPTION_4 ], question[ questionConstant.ANSWER ])
            if (tempQuestion[ questionConstant.QUESTION ] == null || tempQuestion[ questionConstant.QUESTION ] === '') {
                examDTO.success = false
                examDTO.description = examDTO.description + ' ' + QUESTION_IS_EMPTY
            }
            if (tempQuestion[ questionConstant.OPTION_1 ] == null || tempQuestion[ questionConstant.OPTION_1 ] === '') {
                examDTO.success = false
                examDTO.description = examDTO.description + ' ' + OPTION_1_IS_EMPTY
            }
            if (tempQuestion[ questionConstant.OPTION_2 ] == null || tempQuestion[ questionConstant.OPTION_2 ] === '') {
                examDTO.success = false
                examDTO.description = examDTO.description + ' ' + OPTION_2_IS_EMPTY
            }
            if (tempQuestion[ questionConstant.OPTION_3 ] == null || tempQuestion[ questionConstant.OPTION_3 ] === '') {
                examDTO.success = false
                examDTO.description = examDTO.description + ' ' + OPTION_3_IS_EMPTY
            }
            if (tempQuestion[ questionConstant.OPTION_4 ] == null || tempQuestion[ questionConstant.OPTION_4 ] === '') {
                examDTO.success = false
                examDTO.description = examDTO.description + ' ' + OPTION_4_IS_EMPTY
            }
            if (tempQuestion[ questionConstant.ANSWER ] == null || tempQuestion[ questionConstant.ANSWER ] === '') {
                examDTO.success = false
                examDTO.description = examDTO.description + ' ' + ANSWER_IS_EMPTY
            }
            return tempQuestion
        })

        // Check the success
        if (!examDTO.success) {
            // If status is false, set the status code as 500 for internal server error
            examDTO.status = 500
            logger.info('Exiting | ExamServices::addExamData | Values Missing')
            return examDTO
        } else {
            // Setting the admin data to DTO object
            examDTO.examData = admin

            // Calling the addExamData method of DAO class
            examDTO = await examDao.addExamData(examDTO)

            logger.info('Exiting | ExamServices::addExamData')
            return examDTO
        }
    }
}

// Exporting the ExamServices Class
module.exports = ExamServices