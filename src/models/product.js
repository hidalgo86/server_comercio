"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para la colección de productos
const productSchema = new Schema({
  image: {
    type: String, // URL o ruta de la imagen del producto
  },
  name: {
    type: String, // Nombre del producto
  },
  price: {
    type: Number, // Precio del producto
  },
  codigo: {
    type: Number, // Código único del producto
  },
  stock: {
    type: Number, // Cantidad disponible en inventario
  },
  vencimiento: {
    type: String, // Fecha de vencimiento del producto (recomendación: usar Date)
  },
  user: {
    type: Schema.ObjectId, // Referencia a un documento en la colección de usuarios
    required: true, // Obligatorio
    ref: "User", // Nombre del modelo referenciado
  },
  provider: {
    type: Schema.ObjectId, // Referencia a un documento en la colección de proveedores
    required: true, // Obligatorio
    ref: "Provider", // Nombre del modelo referenciado
  },
});

// Transformación al convertir a JSON
productSchema.set("toJSON", {
  transform: (document, returnedObjetc) => {
    returnedObjetc.id = returnedObjetc._id; // Renombrar _id a id
    delete returnedObjetc._id; // Eliminar _id
    delete returnedObjetc.__v; // Eliminar __v
  },
});

// Exportar el modelo
module.exports = mongoose.model("Product", productSchema);
