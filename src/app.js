"use strict";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerSetup = require("./swagger");
const rateLimit = require("express-rate-limit");
const logRequests = require("./middleware/log");
const app = express();


// 1. Middlewares de seguridad

// 1.1 Configuración de Helmet (protección de cabeceras HTTP)
// app.use(
//   helmet({
  //     // Activar solo en desarrollo: 
  //     contentSecurityPolicy: false, // Desactiva CSP si no lo necesitas
  //     crossOriginEmbedderPolicy: false, // Desactiva COEP si no es necesario
  //   })
// );

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "https://apis.google.com"], // Ajusta según tus necesidades
//         styleSrc: ["'self'", "'unsafe-inline'"], // Permitir estilos inline si usas CSS en línea
//         imgSrc: ["'self'", "data:"], // Permite imágenes locales y base64
//         connectSrc: ["'self'", "https://api.tuservidor.com"], // Ajusta según tu backend
//       },
//     },
//     hidePoweredBy: true, // Oculta la tecnología usada en el servidor
//     frameguard: { action: "deny" }, // Evita que el sitio se cargue en un iframe (Clickjacking)
//     xssFilter: true, // Habilita protección contra XSS en navegadores antiguos
//     noSniff: true, // Evita que el navegador interprete tipos MIME incorrectamente
//     dnsPrefetchControl: { allow: false }, // Evita el prefetching de DNS
//     hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Fuerza HTTPS por 1 año
//     referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Controla la información de referidos
//   })
// );

// 1.2 Configuración de CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: ["http://localhost:3000", "https://mi-dominio.com"], // Lista de dominios permitidos
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: [
    "Authorization",
    "X-API-KEY",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
  ], // Encabezados permitidos
};
app.use(cors(corsOptions));

// 1.3 Configuración de Rate Limiting (limitación de solicitudes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo de nuevo después de 15 minutos.",
  standardHeaders: true, // Devuelve información de límite en los encabezados `RateLimit-*`
  legacyHeaders: false, // Desactiva los encabezados `X-RateLimit-*`
});
app.use(limiter);

// 2. Middlewares de análisis de datos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3. Rutas de la aplicación
const provider_routes = require("./routes/provider");
const user_routes = require("./routes/user");
const authorization_routes = require("./routes/authorization");
const article_routes = require("./routes/product");
const validateRole = require("./middleware/validateRole");
// Usar el middleware
app.use(logRequests);
app.use("/api", authorization_routes);
app.use("/api", user_routes);
app.use("/api", provider_routes);
app.use("/api", article_routes);

// 4. Configurar Swagger
swaggerSetup(app);

// 5. Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Ocurrió un error en el servidor." });
});

module.exports = app;
