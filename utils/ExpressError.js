class ExpressError extends Error {
    constructor(message, statusCode) {
        // calls constructor of error class from express
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = ExpressError