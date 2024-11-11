var express = require('express');
const userModel = require("../Schemas/users");
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'B2B Wholsale Marketplace' });
});

router.get('/create', async function(req,res){
  const createduser = await userModel.create({
    Name: "Muhammad Tayyab",
    username: "tayyab11243",
    Email: "its.tayyab@gmail.com",
    password: "su3hi4890",
    Phone: "03004158429"
  });

  res.send(createduser);
})

module.exports = router;
