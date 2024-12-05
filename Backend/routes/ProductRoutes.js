const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductControllers");
import ProductControllers from "../Controllers/ProductControllers";
import { authorizeUser, authenticateToken } from "../middlewares/usersMiddlewares";

router.get("/",productController.GetAllProducts);

router.post("/AddProduct",authenticateToken, authorizeUser("seller"), productController.CreateProduct);

router.delete("/deleteProduct/:productId", authenticateToken, authorizeUser("seller"), productController.deleteProduct);

router.put("/updateProduct/:productId", authenticateToken, authorizeUser("seller"),ProductControllers.updateProduct);