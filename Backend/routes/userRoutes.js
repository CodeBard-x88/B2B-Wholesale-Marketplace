const express = require("express");
const userModel = require("./users");  
var router = express.Router();

router.post('/submitSignupForm', function(req, res) {
    const user = new userModel(req.body);
    user.save();
    res.send(user);
});

module.exports = router;
