"use strict";
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");
const userController = require("../controllers/user");

//Rutas para los usuarios:
router.get(
  "/user",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede listar todos los usuarios
  userController.userGet
);

router.get(
  "/user/:id",
  validateToken,
  validateRole(["Admin", "Provider", "Client"]), // Todos los roles pueden ver un usuario específico
  userController.userGetId
);

router.put(
  "/user/update/:id",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden actualizar usuarios
  [
    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  userController.userPutId
);

router.post(
  "/user/create",
  validateRole(["Admin"]), // Solo Admin puede crear usuarios
  [
    check("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  userController.userSave
);

router.delete(
  "/user/delete",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar todos los usuarios
  userController.userDeleteAll
);

router.delete(
  "/user/delete/:id",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar un usuario específico
  userController.userDelete
);

module.exports = router;
