const express = require("express");
const app = express();

require("./db/conn");

const Student = require("./models/students");
const port = 7900;

app.use(express.json()); // Use for show postman body data

// video 30

const StudentRouter = require("./routers/student");
// 3: We need to register our router
app.use(StudentRouter);


app.get('/', (req, res) => {
    res.send("get request default");
})

// Both post request are same so when you start the server at that time comment one post request

// Two types of save the data then method and second one is async await method

// then and catch method
// app.post('/students', (req, res) => {
//     const user = new Student(req.body); // get the data in postman body request using req.body

//     // Use for mongodb compass to show the data
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     });

//     console.log(req.body);
//     res.send("25 tutorial Rest API");
// });

// video 26
// async await method --> // try and catch method
app.post('/students', async (req, res) => {

    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
    console.log(req.body);
    // res.send("25 tutorial Rest API");
});


// video 27
// Read the data from the database using postman
app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    }
    catch (e) {
        res.send(e);
    }
});

// get the individual student data using postman
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const studentData = await Student.findById(_id); // Find the data using particular id
        if (!studentData) {

            return res.status(404).send();
        }
        else {
            // Get full detail of this particular id
            res.send(studentData);
        }
    }
    catch (e) {
        res.status(400).send(e);
    }
    res.send("video 27");
});


//video 28
// Update the students detail using id

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudents);

    }
    catch (e) {
        res.status(404).send(e);
    }
})

// video 29
// Delete the student detail using id

app.delete("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(id);
        if (!id) {
            return res.status(400).send();
        }
        else {
            res.send(deleteStudent);
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});