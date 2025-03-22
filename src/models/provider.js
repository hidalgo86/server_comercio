"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Esquema para la colección de proveedores
const providerSchema = new Schema({
  razonSocial: {
    type: String, // Cadena de texto
    required: true, // Obligatorio
  },
  name: {
    type: String, // Cadena de texto
    required: true, // Obligatorio
  },
  telf: {
    type: Number, // Número
    required: true, // Obligatorio
  },
  email: {
    type: String, // Cadena de texto
    required: true, // Obligatorio
  },
  user: {
    type: Schema.ObjectId, // Referencia a un documento en otra colección
    required: true, // Obligatorio
    ref: "User", // Nombre del modelo referenciado
  },
});

// Transformación al convertir a JSON
providerSchema.set("toJSON", {
  transform: (document, returnedObjetc) => {
    returnedObjetc.id = returnedObjetc._id; // Renombrar _id a id
    delete returnedObjetc._id; // Eliminar _id
    delete returnedObjetc.__v; // Eliminar __v
  },
});

// Exportar el modelo
module.exports = model("Provider", providerSchema);
