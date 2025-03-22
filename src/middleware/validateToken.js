const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware para validar el token de acceso
function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Obtener el encabezado Authorization

  // Verificar si el encabezado Authorization existe y tiene el formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401) // Código 401: No autorizado
      .json({ message: "Access denied. Token missing or invalid." });
  }

  const accessToken = authHeader.substring(7); // Extraer el token después de "Bearer "

  // Verificar el token usando la clave secreta
  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      return res
        .status(403) // Código 403: Prohibido
        .json({ message: "Access denied. Token expired or invalid." });
    }
    req.user = user; // Almacenar los datos del usuario decodificados en la solicitud
    next(); // Continuar con la siguiente función o ruta
  });
}

module.exports = validateToken;
