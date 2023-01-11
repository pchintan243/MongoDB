const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        // required: true
    },
    Lastname: {
        type: String,
        // required: true
    },
    Email: {
        type: String,
        // required: true,
        // unique: true
    },
    Gender: {
        type: String,
        // required: true
    },
    Phone: {
        type: Number,
        // required: true,
        // unique: true
    },
    Password: {
        type: String,
        // required : true
    },
    Cpassword: {
        type: String,
        // required : true
    }

});

// Pre means after that you get the value of user information and before the save this part will execute
loginSchema.pre("save", async function (next) {

    console.log(this.Password); // before hashing pass value
    this.Password = await bcrypt.hash(this.Password, 10);
    console.log(this.Password); // after hashing pass value

    // it will not show in mongodb compass after you declare cpass as a undefined
    this.Cpassword = undefined;
    next();

})

const Register = new mongoose.model("Register", loginSchema);

module.exports = Register;