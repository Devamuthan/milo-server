// Data Model Schedule
class Schedule{
    // Model contains subjectCode: string, questions: object of type Question
    constructor (subjectCode, questions) {
        this._subjectCode = subjectCode
        this._questions = questions
    }

    // Getter of subjectCode
    get subjectCode () {
        return this._subjectCode
    }

    // Setter of subjectCode
    set subjectCode (value) {
        this._subjectCode = value
    }

    // Getter of questions
    get questions () {
        return this._questions
    }

    // Setter of questions
    set questions (value) {
        this._questions = value
    }

    // Getter of json
    // Returns the content of this class as json format
    get json(){
        return {
            subjectCode: this.subjectCode,
            questions: this.questions
        }
    }
}

// Exporting the Schedule model
module.exports = Schedule