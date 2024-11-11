const jwt = require("jsonwebtoken");
const userModel = require("../Schemas/users");
require("dotenv").config();

const aunthenticateToken = (req,res,next) => {
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


module.exports = {aunthenticateToken, authorizeUser};