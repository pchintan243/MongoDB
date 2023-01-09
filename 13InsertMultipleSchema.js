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

const createDocument = async () => {
    try {
        const inValue1 = new InsertMultiple({
            firstname: "chintan",
            lastname: "patel",
            age: 18,
            address: 702
        })

        const inValue2 = new InsertMultiple({
            firstname: "hemang",
            lastname: "vekariya",
            age: 20,
            address: 70222
        })
        const inValue3 = new InsertMultiple({
            firstname: "kevin",
            lastname: "paghdal",
            age: 10,
            address: 222
        })
        const inValue4 = new InsertMultiple({
            firstname: "krunal",
            lastname: "rabadiya",
            age: 20,
            address: 120
        })
        await InsertMultiple.insertMany([inValue1, inValue2, inValue3, inValue4]);

        // It use for show data in terminal 
        // console.log(await InsertMultiple.insertMany([inValue1, inValue2, inValue3, inValue4]));
    } 
    catch(err) {
        console.log(err);
    }
};

createDocument();
// console.log(inValue);
