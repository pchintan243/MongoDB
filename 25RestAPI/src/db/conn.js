const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/25student-api');
    console.log("mongoose connect");
}