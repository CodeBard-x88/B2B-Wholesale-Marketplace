const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductControllers");
const { authenticateToken, authorizeUser } = require("../middlewares/usersMiddlewares");

router.get("/",productController.GetAllProducts);

router.post("/AddProduct",authenticateToken, authorizeUser("seller"), productController.CreateProduct);

router.delete("/deleteProduct/:productId", authenticateToken, authorizeUser("seller"), productController.deleteProduct);

router.put("/updateProduct/:productId", authenticateToken, authorizeUser("seller"),productController.updateProduct);


module.exports = router;