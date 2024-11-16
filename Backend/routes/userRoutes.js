const express = require("express");
const userModel = require("../Schemas/users");
const sellerModel = require("../Schemas/Seller");
const passwordResetModels = require('../Schemas/PasswordResetTokens');
const jwt = require("jsonwebtoken");
const {aunthenticateToken, authorizeUser, authenticatePasswordResetRequest} = require("../middlewares/usersMiddlewares");
require('dotenv').config();
const crypto = require('crypto');
const transporter = require('../config/NodeMailerTransporter');
const SellerModel = require("../Schemas/Seller");

var router = express.Router();

//Below commented code is used if schema is changed and changes needs to be reflected on the existing documents as well in clusters

// const updateUserRoles = async () => {
//     try {
//       const users = await userModel.find({ role: { $exists: true } }); // Corrected query condition
  
//       for (const doc of users) {
//         doc.role = 'buyer';
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

router.get("/profile", aunthenticateToken, authorizeUser("buyer"), (req,res) => {
    return res.status(200).json({message: `Welcome ${req.user.userName}!`});
})

router.get("/forgotPassword", async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ error: "No Email provided" });
    }

    let url = null;
    let randomUserId = null;  // Declare outside the try block so it's accessible in case of an error
    let user = null;
    try {
        user = await userModel.findOne({ Email: email });
        const resetToken = crypto.randomBytes(64).toString('hex');
        
        if (!user) {
            console.log("User not found!");
            // Generate a random userId if no user is found
            randomUserId = crypto.randomBytes(64).toString('hex');
            console.log("Random user id: " + randomUserId);
            url = `http://localhost:3000/users/resetPassword/${randomUserId}/${resetToken}`;
        } else {
            console.log("User found!");
            // Create token hash
            const hash = crypto.createHash('sha256');
            hash.update(resetToken);
            const digest = hash.digest('hex');

            // Create a password reset document 
            //if already existing, update it
            //if not exits, then it will create
            //ensuring that any moment, a single user have single password reset token
            await passwordResetModels.findOneAndUpdate(
                { userId: user._id }, 
                { 
                  userId: user._id,     
                  TokenHash: digest,    
                  createdAt: Date.now(),
                },
                { 
                  new: true,          
                  upsert: true,       
                  runValidators: true 
                }
              );

            url = `http://localhost:3000/resetPassword/${user._id}/${resetToken}`;
        }
    } catch (error) {
        console.log("Error occurred while generating password reset link:", error);
        
        // Cleanup if document was created
        if (randomUserId == null) {
            // If random userId was generated, no document was created in the database
            // Otherwise, delete the document created earlier
            try {
                await passwordResetModels.deleteOne({ userId: randomUserId });
            } catch (err) {
                console.log("Error occurred while cleaning up document:", err);
            }
        }
        return res.status(500).json({ error: "Error generating password reset link" });
    }

    try {
        const info = await transporter.sendMail({
            from: "solo.developer29@gmail.com",
            to: `${randomUserId ? email : user.Email}`,  // If user exists, use email from database; else use entered email
            subject: "Password Reset Request for Your Karoobar Account",
            text: `Dear User,

            We received a request to reset your password for your Karoobar account. To proceed, please click the link below to create a new password:

            ${url}

            For your security, this link will expire in 10 minutes. If you didn’t request a password reset, please disregard this email. Your account remains secure, and no changes will be made.

            If you need further assistance, feel free to reach out to our support team at support@karoobar.com.

            Best regards,  
            The Karoobar Team`,
            html: `
                <p>Dear User,</p>
                <p>We received a request to reset your password for your Karoobar account. To proceed, please click the link below to create a new password:</p>
                <p><a href="${url}">Reset Your Password</a></p>
                <p>For your security, this link will expire in 10 minutes. If you didn’t request a password reset, please disregard this email—your account remains secure, and no changes will be made.</p>
                <p>If you need further assistance, feel free to reach out to our support team at <a href="mailto:support@karoobar.com">support@karoobar.com</a>.</p>
                <br>
                <p>Best regards,</p>
                <p>The Karoobar Team</p>
                <br>
                <p style="font-size: small; color: gray;">*This is an automated message. Please do not reply directly to this email.*</p>`
        });
        console.log("Message ID:", info.messageId);
        res.status(200).json({ response: "Message sent successfully!" });
    } catch (error) {
        console.log("Error while sending email:", error);
        
        // Cleanup if document was created
        try {
            await passwordResetModels.deleteOne({ userId: randomUserId });
        } catch (err) {
            console.log("Error occurred while cleaning up document:", err);
        }
        
        return res.status(500).json({ error: "Failed to send email." });
    }
});


router.get("/resetPassword/:userId/:resetToken", authenticatePasswordResetRequest, (req, res) => {
    // If the token is valid, show a reset password form or success message
    res.send("Welcome to Reset Password!");
});

router.post("/sellerRegistration" , aunthenticateToken, authorizeUser('buyer'), async(req,res) => {
    const {businessEmail, buyerEmail, IBAN, NTN, CNIC} = req.body;

    if(!businessEmail || !IBAN || !NTN || !CNIC || !buyerEmail){
        return res.status(400).json({error: "A required field is empty"});
    }

    try {
        //authentication of buyer email is already done with the help of middleware
        const seller = await sellerModel.create({businessEmail: req.body.businessEmail,
        AssociatedBuyerAccountEmail: req.body.buyerEmail,
        CNIC: req.body.CNIC,
        NTN: req.body.NTN,
        IBAN: req.body.IBAN,
    })

    console.log("New Seller created: %s\nSeller status: %s" , seller._id, seller.sellerAccountStatus);
    return res.send(200).json({message: "Thanks for submitting the Seller Registration form!\nWe have recieved your request. Your applicaiton is currently in pending Status.\nApplication's status will be updated within 24 hours."})
    } catch (error) {
       return res.send(500).json({error: "An error occurred while submitting the form!\n Apologies for the inconvenience! Please try again later."})
    }
    
})


module.exports = router;
