const express = require('express');
const app = express();

// video 30
// if you remove all the app requst or make it as a require in student.js file so you can import the model after that replace router with app

// import the schema file --> student.js
// const fhskh = require("../models/students");


// 1: Create a new router
const router = new express.Router();
// 2: We need to define the router
router.get('/chintan', (req, res) => {
    res.send("Router is succesfully started..!!");
});

module.exports = router;