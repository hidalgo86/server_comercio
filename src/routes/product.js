"use strict";

const express = require("express");
const router = express.Router();
const Product = require("../controllers/product");
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");

//Rutas para los articulos:
router.get(
  "/product",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden listar productos
  Product.productGet
);

router.get(
  "/product/:id",
  validateToken,
  validateRole(["Admin", "Provider", "Client"]), // Todos los roles pueden ver un producto específico
  Product.productGetId
);

router.put(
  "/product/update/:id",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden actualizar productos
  Product.productPutId
);

router.post(
  "/product/create",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden crear productos
  Product.productSave
);

router.delete(
  "/product/delete",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar todos los productos
  Product.productDeleteAll
);

router.delete(
  "/product/delete/:id",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar un producto específico
  Product.productDelete
);

module.exports = router;
