"use strict";

const express = require("express");
const { check } = require("express-validator"); // Importar express-validator
const router = express.Router();
const authorizationController = require("../controllers/authorization");
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");

// Rutas para la autenticación:
router.post(
  "/user/authorization",
  [
    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("password")
      .notEmpty()
      .withMessage("La contraseña es obligatoria")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  validateToken,
  validateRole(["Admin", "Provider", "Client"]), // Todos los roles pueden autenticarse
  authorizationController.auth
);

module.exports = router;
