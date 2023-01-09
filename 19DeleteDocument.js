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

const deletedoc = mongoose.model('deletedoc', insert);

const deleteDocumentOne = async (_id) => {
    try {
        // deleteone only gives acknowledge or deleted count
        const result1 = await deletedoc.deleteOne({ _id });
        console.log(result1);
    }
    catch (err) {
        console.log(err);
    }

}
const deleteDocumentData = async (_id) => {
    try {
        // findByIdAndDelete shows which documents was deleted
        const result1 = await deletedoc.findByIdAndDelete({ _id });
        console.log(result1);
    }
    catch (err) {
        console.log(err);
    }
}

deleteDocumentOne("63bbe02f61a8864f4af4e4ef");
deleteDocumentData("63bbe45461a8864f4af4e4f7");