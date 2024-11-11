const express = require("express");
const userModel = require("../Schemas/users");  
const jwt = require("jsonwebtoken");
require('dotenv').config();

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

module.exports = router;
