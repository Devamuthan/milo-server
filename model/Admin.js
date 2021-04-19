// Data Model Admin
class Admin {
    // Model contains adminId: string, schedule: object of type Schedule
    constructor (adminId, schedule) {
        this._adminId = adminId
        this._schedule = schedule
    }

    // Getter for adminId
    get adminId () {
        return this._adminId
    }

    // Setter for adminId
    set adminId (value) {
        this._adminId = value
    }

    // Getter for schedule
    get schedule () {
        return this._schedule
    }

    // Setter for Schedule
    set schedule (value) {
        this._schedule = value
    }

    // Getter for json
    // Returns the content of this class as json format
    get json () {
        return {
            adminId: this.adminId,
            schedule: this.schedule
        }
    }
}

// Exporting the Admin model
module.exports = Admin