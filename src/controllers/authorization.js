"use strict";
require("dotenv").config()
const jwt = require("jsonwebtoken");
var User = require("../models/user");

function generateAccessToken(usuario) {
  return jwt.sign(usuario, process.env.SECRET, { expiresIn: "500m" });
}

var controller = {
  //Metodo para listar los usuarios:
  auth: (req, res) => {
    const { username, password } = req.body;

    var query = User.find({ username: username });

    query
      .then((user) => {
        if (!user.length) {
          return res.send({ error: "Usuario no registrado" });
        }

        if (user[0].password === password) {

          const userForToken = {
            username,
            password
          }

          const accessToken = generateAccessToken(userForToken);
          return res.header("authorization", accessToken).json({
            token: accessToken,
          });
        } else {
          return res.send({ error: "password invalida" });
        }
      })
      .catch((error) => {
        console.log(error.message);
        return res.send({ error: error.message });
      });
  },
};

module.exports = controller;
