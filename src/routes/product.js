"use strict";
//Importar el objeto router de express:
const express = require("express");
const router = express.Router();

//Importamos el controlador:
const Product = require("../controllers/product");

//Rutas para los articulos:
router.get("/product", Product.productGet);
router.get("/product/:id", Product.productGetId);
router.put("/product/update/:id", Product.productPutId);
router.post("/product/create", Product.productSave);
router.delete("/product/delete", Product.productDeleteAll);
router.delete("/product/delete/:id", Product.productDelete);

module.exports = router;
