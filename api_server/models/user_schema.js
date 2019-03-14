const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3,
        trim: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 8,
    }
});

module.exports = mongoose.model('user', userSchema);