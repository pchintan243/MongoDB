const express = require('express');
const app = express();

// video 30


// 1: Create a new router
const router = new express.Router();
// 2: We need to define the router
router.get('/chintan', (req, res) => {
    res.send("Router is succesfully started..!!");
});

module.exports = router;