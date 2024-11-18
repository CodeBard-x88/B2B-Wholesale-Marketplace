const formidable = require("formidable");
const fs = require("fs");
const sellerModel = require('../Schemas/Seller');

const express = require("express");
const {aunthenticateToken, authorizeUser} = require("../middlewares/usersMiddlewares");
const path = require("path");
require('dotenv').config();
var router = express.Router();

const ROLE_ALLOWED = 'buyer';

router.get("/storeRegistrationForm", (req, res) => {
    const userId = "Muhammad Tayyab";  // The value you want to pass to EJS
    res.render("create-store.ejs", { userId: userId }); // Passing as an object
});


router.post("/createstore", aunthenticateToken, authorizeUser(ROLE_ALLOWED),(req,res) => {
    
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, '../public/uploads/');
    form.maxFileSize = 10*1024*1024; //10MB

    form.parse(req, (err,fields, files) => {
        if(err)
            return res.status(500).json({error: "Internal Sever error!"});

        console.log("Fields: ", fields);
        console.log("Files: ", files);

        return res.status(200).json({message: "Files uploaded successfully"});
    })
})

module.exports = router;