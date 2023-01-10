const mongoose = require('mongoose');

main().catch(err => console.log(err));
mongoose.set('strictQuery', true);
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Olympic31');
    console.log("mongoose run");
}
