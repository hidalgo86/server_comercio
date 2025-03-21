"use strict";

let Provider = require("../models/provider");
let User = require("../models/user");

// Creamos un objeto para disponer de todos los métodos de ruta que vamos a definir:
let controller = {
  // Crear un proveedor:
  providerSave: async (req, res) => {
    try {
      let data = req.body;
      let provider = await new Provider(data).save();
      res.status(201).json(provider); // Código 201: Recurso creado
    } catch (error) {
      console.log({ providerSave_error: error.message });
      res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Buscar todos los proveedores:
  providerGet: async (req, res) => {
    try {
      let providers = await Provider.find({}).populate("user", {
        username: 1,
        password: 1,
        _id: 0,
      });
      if (!providers.length) {
        return res.status(404).json({ message: "No hay proveedores" }); // Código 404: No encontrado
      }
      return res.status(200).json(providers); // Código 200: Éxito
    } catch (error) {
      console.log({ providerGet_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Buscar un proveedor por Id:
  providerGetId: async (req, res) => {
    try {
      let providerId = req.params.id;
      let provider = await Provider.findById(providerId).populate("user", {
        username: 1,
        password: 1,
        _id: 0,
      });
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json(provider); // Código 200: Éxito
    } catch (error) {
      console.log({ providerGetId_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Actualizar un proveedor por Id:
  providerPutId: async (req, res) => {
    try {
      let providerId = req.params.id;
      let data = req.body;
      let provider = await Provider.findByIdAndUpdate(providerId, data, {
        returnDocument: "after",
      });
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json(provider); // Código 200: Éxito
    } catch (error) {
      console.log({ providerPutId_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Eliminar un proveedor:
  providerDelete: async (req, res) => {
    try {
      let providerId = req.params.id;
      let provider = await Provider.findByIdAndDelete(providerId);
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json({ message: "Proveedor eliminado" }); // Código 200: Éxito
    } catch (error) {
      console.log({ providerDelete_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Eliminar todos los proveedores:
  providerDeleteAll: async (req, res) => {
    try {
      let result = await Provider.deleteMany();
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No hay proveedores a eliminar" }); // Código 404: No encontrado
      }
      return res.status(200).json({ deletedCount: result.deletedCount }); // Código 200: Éxito
    } catch (error) {
      console.log({ providerDeleteAll_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },
};

module.exports = controller;
