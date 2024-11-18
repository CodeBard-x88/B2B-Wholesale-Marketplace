const jwt = require("jsonwebtoken");
const userModel = require("../Schemas/users");
const passwordResetModels = require('../Schemas/PasswordResetTokens');
const crypto = require('crypto');
require("dotenv").config();

const authenticateToken = (req,res,next) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({message: "Access Denied! No token provided!"});
     }

     try {
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verified;
        next();
     } catch (error) {
        return res.status(403).json({error: "Invalid Token!"});
     }
};

const authorizeUser = (requiredRole) => async (req, res, next) => {

    try {
        console.log(req.user.userId);
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        console.log(user.role);
    if(user.role !== requiredRole)
        return res.status(403).json({error: "Restricted Unauthorized Access!"});
    
    next();
    } catch (error) {
        return res.status(500).json({error: "An error occurred while authorizing user!"});
    }
    
};

const authenticatePasswordResetRequest = async (req, res, next) => {
    const { userId, resetToken } = req.params; // make sure the parameter names match with the route
    
    try {
        const token = await passwordResetModels.findOne({ userId: userId });

    if (!token) {
        return res.status(400).json({ error: "Invalid Reset Link!" });
    }

    const hash = crypto.createHash('sha256');
    hash.update(resetToken);
    const digest = hash.digest('hex');

    if (token.TokenHash !== digest) {
        return res.status(400).json({ error: "Invalid Reset Link!" });
    }

    console.log("Valid Reset Request");
    next();
    } catch (error) {
        return res.status(400).json({error: "Invalid Reset Link!"});
    }
    
};

module.exports = {authenticateToken, authorizeUser, authenticatePasswordResetRequest};