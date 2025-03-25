"use strict";

const express = require("express");
const { check } = require("express-validator"); // Importar express-validator
const router = express.Router();
const productController = require("../controllers/product");
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");

// Rutas para los productos:
router.get(
  "/product",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden listar productos
  productController.productGet
);

router.get(
  "/product/:id",
  validateToken,
  validateRole(["Admin", "Provider", "Client"]), // Todos los roles pueden ver un producto específico
  productController.productGetId
);

router.put(
  "/product/update/:id",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden actualizar productos
  [
    check("name")
      .notEmpty()
      .withMessage("El nombre del producto es obligatorio"),
    check("price")
      .isNumeric()
      .withMessage("El precio debe ser un número")
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser mayor o igual a 0"),
    check("stock")
      .isInt({ min: 0 })
      .withMessage("El stock debe ser un número entero mayor o igual a 0"),
    check("codigo").isNumeric().withMessage("El código debe ser un número"),
    check("vencimiento")
      .optional()
      .isISO8601()
      .withMessage(
        "La fecha de vencimiento debe tener un formato válido (ISO 8601)"
      ),
  ],
  productController.productPutId
);

router.post(
  "/product/create",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden crear productos
  [
    check("name")
      .notEmpty()
      .withMessage("El nombre del producto es obligatorio"),
    check("price")
      .isNumeric()
      .withMessage("El precio debe ser un número")
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser mayor o igual a 0"),
    check("stock")
      .isInt({ min: 0 })
      .withMessage("El stock debe ser un número entero mayor o igual a 0"),
    check("codigo").isNumeric().withMessage("El código debe ser un número"),
    check("vencimiento")
      .optional()
      .isISO8601()
      .withMessage(
        "La fecha de vencimiento debe tener un formato válido (ISO 8601)"
      ),
  ],
  productController.productSave
);

router.delete(
  "/product/delete",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar todos los productos
  productController.productDeleteAll
);

router.delete(
  "/product/delete/:id",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar un producto específico
  productController.productDelete
);

module.exports = router;
