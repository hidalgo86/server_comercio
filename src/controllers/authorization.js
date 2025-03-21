"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
var User = require("../models/user");

// Función para generar un token de acceso
function generateAccessToken(usuario) {
  return jwt.sign(usuario, process.env.SECRET, { expiresIn: "1h" });
}

var controller = {
  // Método para autenticar usuarios:
  auth: (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario por nombre de usuario
    var query = User.find({ username });

    query
      .then((user) => {
        if (!user.length) {
          // Código 404: Usuario no encontrado
          return res.status(404).json({ error: "Usuario no registrado" });
        }

        // Verificar contraseña
        if (user[0].password === password) {
          const userForToken = {
            username,
            password,
          };

          // Generar token de acceso
          const accessToken = generateAccessToken(userForToken);

          // Código 200: Éxito
          return res.header("authorization", accessToken).status(200).json({
            token: accessToken,
          });
        } else {
          // Código 401: Credenciales inválidas
          return res.status(401).json({ error: "Contraseña inválida" });
        }
      })
      .catch((error) => {
        console.log(error.message);
        // Código 500: Error interno del servidor
        return res.status(500).json({ error: error.message });
      });
  },
};

module.exports = controller;
