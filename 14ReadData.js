const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const { Int16Array } = require('webidl-conversions');
const port = 1200;
mongoose.set('strictQuery', true);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/InsertMultiple13');
    console.log("connected");
}

const insert = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    address: Number
});

const InsertMultiple = mongoose.model('InsertMultiple', insert);

// All data is get directly in 13insertmultipleschema.js file
// All data are read in this file


// Always use try and catch when we are dealing with async funtion
const getDocument = async () => {
    try {
        const result = await InsertMultiple.find();
        // const result = await InsertMultiple.find({age : 20});

        // For show only firstname Not show all the data
        // const result = await InsertMultiple.find({age : 20}).select({firstname : 1});

        // It gives only first data even two data have age is 20
        // const result = await InsertMultiple.find({ age: 20 }).limit(1);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}

getDocument();
