// filepath: c:\Users\USUARIO\Desktop\Server_comercio\src\routes\user.js
"use strict";
//Importar el objeto router de express:
const express = require("express");
const router = express.Router();
const validate = require("../middleware/validateToken");

//Importamos el controlador:
let user = require("../controllers/user");

//Validacion de usuario con un middleware configurado con Json Web Token:
const validateToken = require("../middleware/validateToken");

router.get("/user", user.userGet);

router.get("/user/:id", user.userGetId);

router.put("/user/update/:id", user.userPutId);

router.post("/user/create", user.userSave);

router.delete("/user/delete", validate, user.userDeleteAll);

router.delete("/user/delete/:id", user.userDelete);

module.exports = router;
