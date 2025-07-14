const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    Email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    }
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;