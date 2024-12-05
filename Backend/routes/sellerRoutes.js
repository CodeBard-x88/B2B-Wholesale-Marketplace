const express = require("express");
const { authenticateToken, authorizeUser } = require("../middlewares/usersMiddlewares");
const router = express.Router();
const sellerControllers = require("../Controllers/SellerControllers");

const ROLE_ALLOWED = "seller";

router.post("/createstore", authenticateToken, authorizeUser(ROLE_ALLOWED), sellerControllers.RegisterStore);

module.exports = router;