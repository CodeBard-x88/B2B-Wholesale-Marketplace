const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductControllers");
import { authorizeUser, authenticateToken } from "../middlewares/usersMiddlewares";

router.get("/",productController.GetAllProducts);

router.post("/AddProduct",authenticateToken, authorizeUser("seller"), productController.CreateProduct);