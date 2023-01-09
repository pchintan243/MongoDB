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

const update = mongoose.model('update', insert);

const updateDocument = async (_id) => {
    // It gives only acknowledge and matchedCount
    // It does not shows the updated value
    try {
        const result1 = await update.updateOne({_id}, {
            $set : {
                firstname : "Chintan"
            }
        });
        console.log(result1);
    }
    catch (err) {
        console.log(err);
    }

    // findByIdAndUpdate is shows output which data is modified but make sure to include new as a true
    try {
        const result1 = await update.findByIdAndUpdate({ _id }, {
            $set: {
                lastname: "Patel"
            }
        },
        {
            new : true,  // It use for latest updated data
            useFindAndModify : false // Deprecation warning
        });
        console.log(result1);
    }
    catch (err) {
        console.log(err);
    }
}

updateDocument("63bbdbe761a8864f4af4e4e7");