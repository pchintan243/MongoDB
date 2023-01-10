const express = require('express')
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = 3000;

require("./db/conn");

// Joining the path of static file
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// For views directory
const templatePath = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");  
app.set("views", templatePath);  

// For partial directory
const partialPath = path.join(__dirname, "../templates/partials");
// If you import partials file in views directory
hbs.registerPartials(partialPath); 


app.get('/', (req, res) => {
    res.render("index.hbs");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});