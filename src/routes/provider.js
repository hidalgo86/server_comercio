"use strict";

const express = require("express");
const { check } = require("express-validator"); // Importar express-validator
const router = express.Router();
const providerController = require("../controllers/provider");
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");

// Rutas para los providers:
router.get(
  "/provider",
  validateToken, // Validar token
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden listar proveedores
  providerController.providerGet
);

router.get(
  "/provider/:id",
  validateToken, // Validar token
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden ver un proveedor específico
  providerController.providerGetId
);

router.put(
  "/provider/update/:id",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede actualizar proveedores
  [
    check("razonSocial")
      .notEmpty()
      .withMessage("La razón social es obligatoria"),
    check("name").notEmpty().withMessage("El nombre es obligatorio"),
    check("telf")
      .isNumeric()
      .withMessage("El teléfono debe ser un número")
      .isLength({ min: 10, max: 10 })
      .withMessage("El teléfono debe tener 10 dígitos"),
    check("email")
      .isEmail()
      .withMessage("Debe ser un correo electrónico válido"),
  ],
  providerController.providerPutId
);

router.post(
  "/provider/create",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede crear proveedores
  [
    check("razonSocial")
      .notEmpty()
      .withMessage("La razón social es obligatoria"),
    check("name").notEmpty().withMessage("El nombre es obligatorio"),
    check("telf")
      .isNumeric()
      .withMessage("El teléfono debe ser un número")
      .isLength({ min: 10, max: 10 })
      .withMessage("El teléfono debe tener 10 dígitos"),
    check("email")
      .isEmail()
      .withMessage("Debe ser un correo electrónico válido"),
  ],
  providerController.providerSave
);

router.delete(
  "/provider/delete",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede eliminar todos los proveedores
  providerController.providerDeleteAll
);

router.delete(
  "/provider/delete/:id",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede eliminar un proveedor específico
  providerController.providerDelete
);

module.exports = router;
