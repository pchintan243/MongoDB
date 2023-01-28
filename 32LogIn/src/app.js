const express = require('express')
const app = express();
const path = require('path');
const hbs = require('hbs');
// For hashing  --> securing password
const bcrypt = require('bcryptjs');
const port = 3100;

require("./db/conn");

const Register = require("./models/registers");
// Joining the path of static file
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// For views directory
const templatePath = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For partial directory
const partialPath = path.join(__dirname, "../templates/partials");
// If you import partials file in views directory
hbs.registerPartials(partialPath);


app.get('/', (req, res) => {
    res.render("index.hbs");
});


app.get('/register', (req, res) => {
    res.render("register.hbs");
});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.Password;
        const cpassword = req.body.Cpassword;
        if (password === cpassword) {
            const registerEmployee = new Register({
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                Email: req.body.Email,
                Gender: req.body.Gender,
                Phone: req.body.Phone,
                Password: req.body.Password,
                Cpassword: req.body.Cpassword
            });
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }
        else {
            res.send("password are not matching");
        }
    }
    catch (e) {
        res.status(400).send(e);
    }
});


app.get('/login', (req, res) => {
    res.render("login.hbs");
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.Email;
        const password = req.body.Password;

        // To find the email
        // Email is match with registration email or not
        const userEmail = await Register.findOne({ Email: email });
        // To find the password of that email
        // res.send(userEmail.Password);

        const isMatch = await bcrypt.compare(password, userEmail.Password);

        // Match the password
        // If registration pass and login pass will be same then and then you will be go to index page otherwise else part will be run
        if (isMatch) {
            res.status(201).render("index");
        }
        else {
            res.status(404).send("page not found");
        }
    }
    catch (e) {
        res.status(400).send("Please Enter all the detail correctly..!!");
    }
});

app.get("*", (req, res) => {
    res.render("pageNotFound");
})


// If we store the pass as a hash value so we set logic between get the data and save the data
// Logic in register.js file
// const securePassword = async (password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     // For showing hash value of your password
//     // console.log(passwordHash);

//     // Password will be save in hash format so is this only way to check registration pass and login pass both are same
//     const passwordMatch = await bcrypt.compare(password, passwordHash);
//     // Console gives true if password are same
//     // console.log(passwordMatch);
// }
// securePassword("chintan@2423");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});