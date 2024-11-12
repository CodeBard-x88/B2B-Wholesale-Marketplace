const express = require("express");
const userModel = require("../Schemas/users");
const passwordResetModels = require('../Schemas/PasswordResetTokens');
const jwt = require("jsonwebtoken");
const {aunthenticateToken, authorizeUser} = require("../middlewares/usersMiddlewares");
require('dotenv').config();
const crypto = require('crypto');
const transporter = require('../config/NodeMailerTransporter');

var router = express.Router();

//Below commented code is used if schema is changed and changes needs to be reflected on the existing documents as well in clusters

// const updateUserRoles = async () => {
//     try {
//       const users = await userModel.find({ role: { $exists: false } }); // Corrected query condition
  
//       for (const doc of users) {
//         doc.role = 'user';
//         await doc.save(); // Save the updated document
//       }
  
//       console.log('User roles updated successfully');
//     } catch (error) {
//       console.error('Error updating user roles:', error);
//     }
//   };
  
//   // Call the function to run it when the server starts
//   updateUserRoles();

router.post('/submitSignupForm', function(req, res) {
    const user = new userModel(req.body);
    user.save();
    res.send(user);
});

router.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body;

    //Search for username in database
    const user = await userModel.findOne({username});

    //if user not found
    if(!user){
        return res.status(401).json({error: "Invalid Email or Password"});
    }

    //if user is found then authenticate Password
    const isValidPassword = await user.validatePassword(password);

    if(!isValidPassword){
        return res.status(401).json({error: "Invalid Email or Password"});
    }

    const token = jwt.sign({userId: user._id , userName: user.Name, userRole: user.role}, process.env.SECRET_KEY, {expiresIn: "2 days"});
    res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "An error occurred while logging in!"});
    }
    
});

router.get("/profile", aunthenticateToken, authorizeUser("user"), (req,res) => {
    return res.status(200).json({message: `Welcome ${req.user.userName}!`});
})

router.get("/forgotPassword", async (req, res) => {
    const email = req.body.email;
    if(!email)
        return res.status(400).json({error: "No Email provided"});

    try {
        const user = await userModel.findOne({Email: email});
        if(!user){
            //create token, send email on the entered email, but don't create a password reset token document
            console.log("User not found!");
        }
        else{
            console.log("User found!");
            //create a token
            const resetToken = crypto.randomBytes(64).toString('hex');
            console.log("Reset Token:  %s", resetToken);
            //create tokens hash
            const hash = crypto.createHash('sha256');
            hash.update(resetToken);
            const digest = hash.digest('hex');

            passwordResetModels.create({userId: user._id , TokenHash: digest});

            const url = "https://www.google.com/";
            const info = await transporter.sendMail({
                from: "solo.developer29@gmail.com",
                to: "its.tayyab616@gmail.com",
                subject: "Password Reset Link",
                text: "Click on the link below to reset your password:",
                html: '<a href="localhost:3000">Password Reset Link</a>'
            })

            console.log("Message ID: %s" , info.messageId);
            res.send(200).json({response: "Message send successfully!"});
        }
    } catch (error) {
        
    }   
});

module.exports = router;
