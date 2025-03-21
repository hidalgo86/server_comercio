"use strict";

var Product = require("../models/product");

// Creamos un objeto para disponer de todos los métodos de ruta que vamos a definir:
var controller = {
  // Crear un producto:
  productSave: async (req, res) => {
    try {
      let data = req.body;
      let product = await new Product(data).save();
      res.status(201).json(product); // Código 201: Recurso creado
    } catch (error) {
      console.log({ productSave_error: error.message });
      res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Buscar todos los productos:
  productGet: async (req, res) => {
    try {
      let products = await Product.find({}).sort(-Date);
      if (!products.length) {
        return res.status(404).json({ message: "No hay productos" }); // Código 404: No encontrado
      }
      return res.status(200).json(products); // Código 200: Éxito
    } catch (error) {
      console.log({ productGet_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Buscar un producto por id:
  productGetId: async (req, res) => {
    try {
      let productId = req.params.id;
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json(product); // Código 200: Éxito
    } catch (error) {
      console.log({ productGetId_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Actualizar un producto por id:
  productPutId: async (req, res) => {
    try {
      let productId = req.params.id;
      let data = req.body;
      let product = await Product.findByIdAndUpdate(productId, data, {
        returnDocument: "after",
      });
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json(product); // Código 200: Éxito
    } catch (error) {
      console.log({ productPutId_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Eliminar un producto por id:
  productDelete: async (req, res) => {
    try {
      let productId = req.params.id;
      let product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json({ message: "Producto eliminado" }); // Código 200: Éxito
    } catch (error) {
      console.log({ productDelete_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Eliminar todos los productos:
  productDeleteAll: async (req, res) => {
    try {
      let result = await Product.deleteMany();
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "No hay productos a eliminar" }); // Código 404: No encontrado
      }
      return res.status(200).json({ deletedCount: result.deletedCount }); // Código 200: Éxito
    } catch (error) {
      console.log({ productDeleteAll_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },
};

module.exports = controller;
