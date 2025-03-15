"use strict";
const express = require("express");
const app = express();
const swaggerSetup = require("./swagger");

// Configuración del servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de CORS
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

// Importar rutas del servidor
const provider_routes = require("./routes/provider");
const user_routes = require("./routes/user");
const authorization_routes = require("./routes/authorization");
const article_routes = require("./routes/product");

// Conectar las rutas del servidor
app.use("/api", authorization_routes);
app.use("/api", user_routes);
app.use("/api", provider_routes);
app.use("/api", article_routes);

// Configurar Swagger
swaggerSetup(app);

module.exports = app;
