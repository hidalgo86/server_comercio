"use strict";

const express = require("express");
const router = express.Router();
const provider = require("../controllers/provider");
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");

//Rutas para los providers:
router.get(
  "/provider",
  validateToken, // Validar token
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden listar proveedores
  provider.providerGet
);

router.get(
  "/provider/:id",
  validateToken, // Validar token
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden ver un proveedor específico
  provider.providerGetId
);

router.put(
  "/provider/update/:id",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede actualizar proveedores
  provider.providerPutId
);

router.post(
  "/provider/create",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede crear proveedores
  provider.providerSave
);

router.delete(
  "/provider/delete",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede eliminar todos los proveedores
  provider.providerDeleteAll
);

router.delete(
  "/provider/delete/:id",
  validateToken, // Validar token
  validateRole(["Admin"]), // Solo Admin puede eliminar un proveedor específico
  provider.providerDelete
);

module.exports = router;
