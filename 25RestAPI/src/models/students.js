const mongoose = require('mongoose');
const validator = require('validator');

const student25 = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        unique:[true, "Email id is already there"],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: new Date()
    }
});

const Student = new mongoose.model('Student', student25);

module.exports = Student;