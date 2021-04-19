class ExamDTO {
    constructor (success, status, description, examData) {
        this._success = success
        this._status = status
        this._description = description
        this._examData = examData
    }

    get success () {
        return this._success
    }

    set success (value) {
        this._success = value
    }

    get status () {
        return this._status
    }

    set status (value) {
        this._status = value
    }

    get description () {
        return this._description
    }

    set description (value) {
        this._description = value
    }

    get examData () {
        return this._examData
    }

    set examData (value) {
        this._examData = value
    }

    get json () {
        return {
            SUCCESS: this.success,
            STATUS: this.status,
            DESCRIPTION: this.description,
            EXAM_DATA: this.examData
        }
    }
}

module.exports = ExamDTO