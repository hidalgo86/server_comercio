// filepath: c:\Users\USUARIO\Desktop\Server_comercio\src\swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Negocios",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Autorización",
        description: "Gestión de autorización de usuarios",
      },
      {
        name: "Usuarios",
        description: "Gestión de usuarios",
      },
      {
        name: "Productos",
        description: "Gestión de productos",
      },
      {
        name: "Proveedores",
        description: "Gestión de proveedores",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/docs/*.js"], // Archivos que contienen anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
    //   docExpansion: "none",
    //   defaultModelsExpandDepth: -1,
    })
  );
};
