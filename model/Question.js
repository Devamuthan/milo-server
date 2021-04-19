// Data Model Questions
class Question {
    // Model Questions contains question: sting, option1: string, option2: string, option3: string, option4: string, answer: int
    constructor (question, option1, option2, option3, option4, answer) {
        this._question = question
        this._option1 = option1
        this._option2 = option2
        this._option3 = option3
        this._option4 = option4
        this._answer = answer
    }

    // Getter for question
    get question () {
        return this._question
    }

    // Setter for question
    set question (value) {
        this._question = value
    }

    // Getter for option1
    get option1 () {
        return this._option1
    }

    // Setter for option1
    set option1 (value) {
        this._option1 = value
    }

    // Getter for option2
    get option2 () {
        return this._option2
    }

    // Setter for option2
    set option2 (value) {
        this._option2 = value
    }

    // Getter for option3
    get option3 () {
        return this._option3
    }

    // Setter for option3
    set option3 (value) {
        this._option3 = value
    }

    // Getter for option4
    get option4 () {
        return this._option4
    }

    // Setter for option4
    set option4 (value) {
        this._option4 = value
    }

    // Getter for answer
    get answer () {
        return this._answer
    }

    // Setter for answer
    set answer (value) {
        this._answer = value
    }

    // Getter for json
    // Returns the content of this class as json format
    get json () {
        return {
            question: this.question,
            option1: this.option1,
            option2: this.option2,
            option3: this.option3,
            option4: this.option4,
            answer: this.answer
        }
    }
}

// Exporting the Questions model
module.exports = Question