const express = require('express');
const app = express();

const MensRanking = require("./models/mens")
const port = 2000;
require("./db/conn");

app.use(express.json()); // use for pass the data from postman

app.get('/' ,(req, res) => {
    res.send("get run");
});


app.post('/mens', async (req, res) => {
    try {

        // create the api using postman
        const addMenSchema = new MensRanking(req.body);
        console.log(req.body);
        const insertMens = await addMenSchema.save();
        res.status(201).send(insertMens);
    }
    catch(e) {
        res.status(400).send(e);
    }
});


// Read the data using id
app.get('/mens', async (req, res) => {
    try {
        const getMens = await MensRanking.find({}).sort({"ranking" : 1});
        res.status(200).send(getMens);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

// Read the particular data by ID
app.get('/mens/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getMens = await MensRanking.findById(_id);
        res.status(200).send(getMens);
    }
    catch(e) {
        res.status(400).send(e);
    }
});


// Update the particular data by ID
app.patch('/mens/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getMens = await MensRanking.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).send(getMens);
    }
    catch(e) {
        res.status(500).send(e);
    }
});

// Delete the particular data by ID
app.delete('/mens/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getMens = await MensRanking.findByIdAndDelete(_id, req.body);
        res.status(200).send(getMens);
    }
    catch(e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`connect port ${port}`);
});