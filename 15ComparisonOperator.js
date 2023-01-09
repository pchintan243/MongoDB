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
        const result1 = await InsertMultiple.find({ address: { $lt: 700 } });
        const result2 = await InsertMultiple.find({ address: { $gt: 700 } });
        console.log("First result");
        console.log(result1);
        console.log("Second result");
        console.log(result2);

        // video 17

        // 1 for asceding order and -1 for descending order

        // Sorting the firstname in ascending order
        const result3 = await InsertMultiple.find().select({ firstname: 1 }).sort({firstname: 1});
        console.log("Third result");
        console.log(result3);

        // Sorting the age in ascending order
        const result4 = await InsertMultiple.find().select({ age: 1 }).sort({age : 1});
        console.log("Fourth result");
        console.log(result4);

        // Sorting the address in descending order using -1
        // Count documents is count the total number of records in query
        const result5 = await InsertMultiple.find().select({ address: 1 }).sort({address : -1}).countDocuments();
        console.log("Fifth result");
        console.log(result5);

    }
    catch (err) {
        console.log(err);
    }
}

getDocument();
