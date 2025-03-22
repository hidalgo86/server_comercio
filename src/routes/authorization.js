"use strict";

const express = require("express");
const router = express.Router();
const Authorization = require("../controllers/authorization");
const validateToken = require("../middleware/validateToken");
const validateRole = require("../middleware/validateRole");

//Rutas para la autenticación:
router.post(
  "/user/authorization",
  validateToken,
  validateRole(["Admin", "Provider", "Client"]), // Todos los roles pueden autenticarse
  Authorization.auth
);

module.exports = router;
