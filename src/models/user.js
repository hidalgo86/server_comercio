"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Esquema para la colección de usuarios
const userSchema = new Schema({
  username: {
    type: String, // Cadena de texto
    required: true, // Obligatorio
  },
  password: {
    type: String, // Cadena de texto
    required: true, // Obligatorio
  },
  role: {
    type: String, // Cadena de texto
    enum: ["Admin", "Provider", "Client"], // Valores permitidos
    default: "Client", // Valor por defecto
  },
});

// Transformación al convertir a JSON
userSchema.set("toJSON", {
  transform: (document, returnedObjetc) => {
    returnedObjetc.id = returnedObjetc._id; // Renombrar _id a id
    delete returnedObjetc._id; // Eliminar _id
    delete returnedObjetc.__v; // Eliminar __v
  },
});

// Exportar el modelo
module.exports = model("User", userSchema);
