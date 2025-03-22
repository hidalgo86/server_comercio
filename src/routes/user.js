"use strict";
const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");
const user = require("../controllers/user");

//Rutas para los usuarios:
router.get(
  "/user",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede listar todos los usuarios
  user.userGet
);

router.get(
  "/user/:id",
  validateToken,
  validateRole(["Admin", "Provider", "Client"]), // Todos los roles pueden ver un usuario específico
  user.userGetId
);

router.put(
  "/user/update/:id",
  validateToken,
  validateRole(["Admin", "Provider"]), // Admin y Provider pueden actualizar usuarios
  user.userPutId
);

router.post(
  "/user/create",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede crear usuarios
  user.userSave
);

router.delete(
  "/user/delete",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar todos los usuarios
  user.userDeleteAll
);

router.delete(
  "/user/delete/:id",
  validateToken,
  validateRole(["Admin"]), // Solo Admin puede eliminar un usuario específico
  user.userDelete
);

module.exports = router;
