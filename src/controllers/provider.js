"use strict";

let Provider = require("../models/provider");
let User = require("../models/user");

//creamos un objeto para disponer de todos los metodos de ruta que vamos a definir:

let controller = {
  //Crear un proveedor:
  providerSave: async (req, res) => {
    try {
      let data = req.body;
      let provider = await new Provider(data).save();
      res.status(200).json(provider);
    } catch (error) {
      console.log({ providerSave_error: error.message });
      res.send({ error: error.message });
    }
  },

  //Buscar todos los proveedores:
  providerGet: async (req, res) => {
    await Provider.find({})
      .populate("user", { username: 1, password: 1, _id: 0 })
      .then((providers) => {
        if (!providers.length) return res.send({ message: "No hay proveedor" });
        return res.send(providers);
      })
      .catch((error) => {
        console.log({ providerGet_error: error.message });
        return res.send({ error: error.message });
      });
  },

  //Buscar un proveedor por Id:
  providerGetId: async (req, res) => {
    try {
      let providerId = req.params.id;
      await Provider.find({ _id: providerId })
        .populate("user", { username: 1, password: 1, _id: 0 })
        .then((provider) => {
          if (!provider) return res.send({ message: "No hay proveedores" });
          return res.send(provider);
        });
    } catch (error) {
      console.log({ providerGetId_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Actualizar un proveedor por Id:
  providerPutId: async (req, res) => {
    try {
      let providerId = req.params.id;
      let data = req.body;
      await Provider.findByIdAndUpdate(providerId, data, {
        returnDocument: "after",
      }).then((provider) => {
        if (!provider) return res.send({ message: "Proveedor no existe" });
        return res.send(provider);
      });
    } catch (error) {
      console.log({ providerPutId_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Eliminar un proveedor:
  providerDelete: async (req, res) => {
    try {
      let providerId = req.params.id;
      await Provider.findOneAndDelete({ _id: providerId }).then((provider) => {
        if (!provider) {
          return res.send({ message: "Proveedor no encontrado" });
        }
        return res.send({ message: "Proveedor eliminado" });
      });
    } catch (error) {
      console.log({ providerDelete_error: error.message });
      return res.send({ error: error.message });
    }
  },

  // Eliminar Todos los proveedores:
  providerDeleteAll: async (req, res) => {
    try {
      await Provider.deleteMany().then((provider) => {
        if (!provider) {
          return res.send({ message: "No hay  a eliminar" });
        }
        return res.send({ providerDeleteAll: provider.deletedCount });
      });
    } catch (error) {
      console.log({ providerDeleteAll_error: error.message });
      return res.send({ error: error.message });
    }
  },
};

module.exports = controller;
