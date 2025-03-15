"use strict";
//Importar el objeto router de express:
const express = require("express");
const router = express.Router();

//Importamos el controlador:
let provider = require("../controllers/provider");

//Validacion de proveedor con un middleware configurado con Json Web Token:
const validateToken = require("../middleware/validateToken");

//Rutas para los articulos:
router.get("/provider", provider.providerGet);
router.get("/provider/:id", provider.providerGetId);
router.put("/provider/update/:id", provider.providerPutId);
router.post("/provider/create", provider.providerSave);
router.delete("/provider/delete", provider.providerDeleteAll);
router.delete("/provider/delete/:id", provider.providerDelete);

module.exports = router;
