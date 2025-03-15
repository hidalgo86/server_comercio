"use strict";

var Product = require("../models/product");

//creamos un objeto para disponer de todos los metodos de ruta que vamos a definir:

var controller = {
  //Crear un producto:
  productSave: async (req, res) => {
    try {
      let data = req.body;
      let product = await new Product(data).save();
      res.status(200).json(product);
    } catch (error) {
      console.log({ productSave_error: error.message });
      res.send({ error: error.message });
    }
  },

  //Buscar todos los productos:
  productGet: async (req, res) => {
    await Product.find({})
      .sort(-Date)
      .then((products) => {
        if (!products.length) {
          return res.send({
            message: "No hay productos",
          });
        }
        return res.send(products);
      })
      .catch((error) => {
        console.log({ productGet_error: error.message });
        return res.send({ error: error.message });
      });
  },

  //Buscar un producto por id
  productGetId: async (req, res) => {
    try {
      let productId = req.params.id;
      await Product.find({ _id: productId }).then((product) => {
        if (!product.length) return res.send({ message: "No hay usuarios" });
        return res.send(product);
      });
    } catch (error) {
      console.log({ productGetId_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Actualizar un producto por id
  productPutId: async (req, res) => {
    try {
      let productId = req.params.id;
      let data = req.body;
      await Product.findByIdAndUpdate(
        productId,
        data,
        { returnDocument: "after" }
      ).then((product) => {
        if (!product) return res.send({ message: "Producto no existe" });
        return res.send(product);
      });
    } catch (error) {
      console.log({ productPutId_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Eliminar un producto por id:
  productDelete: async (req, res) => {
    try {
      let productId = req.params.id;
      await Product.findOneAndDelete({ _id: productId }).then((product) => {
        if (!product) {
          return res.send({ message: "Producto no encontrado" });
        }
        return res.send({ message: "producto eliminado" });
      });
    } catch (error) {
      console.log({ productDelete_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Eliminar todos los productos:
  productDeleteAll: async (req, res) => {
    try {
      await Product.deleteMany().then((products) => {
        if (!products) {
          return res.send({ message: "No hay products a eliminar" });
        }
        return res.send({ productDeleteAll: products.deletedCount });
      });
    } catch (error) {
      console.log({ productDeleteAll_error: error.message });
      return res.send({ error: error.message });
    }
  },
};

module.exports = controller;
