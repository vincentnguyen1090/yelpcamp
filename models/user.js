const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// This plugin adds username, hash and salt fields to the schema and provides authentication methods
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)