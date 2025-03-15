"use strict";
//Configuracion del servidor:
const express = require("express");
const app = express();

//Cargamos un middleware para analizar cuerpos a través de la URL y Cualquier partición la convertimos a json:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Activamos el CORS para permitir las peticiones AJAX y HTTP desde el frontend:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, access-control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Importamos rutas del servidor:
const provider_routes = require("./routes/provider");
const user_routes = require("./routes/user");
const authorization_routes = require("./routes/authorization");
const article_routes = require("./routes/product");

//Conectamos las rutas del servidos:
app.use("/api", authorization_routes);
app.use("/api", user_routes);
app.use("/api", provider_routes);
app.use("/api", article_routes);

module.exports = app;
