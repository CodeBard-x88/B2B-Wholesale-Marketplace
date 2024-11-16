const sellerModel = require('../Schemas/Seller');

const express = require("express");
const {aunthenticateToken, authorizeUser} = require("../middlewares/usersMiddlewares");
require('dotenv').config();
var router = express.Router();

const ROLE_ALLOWED = 'buyer';

router.get("/", aunthenticateToken, authorizeUser(ROLE_ALLOWED),(req,res) => {
    res.send("Hello from seller!");
})

module.exports = router;