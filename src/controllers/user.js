"use strict";

let User = require("../models/user");

// Creamos un objeto para disponer de todos los métodos de ruta que vamos a definir:
let controller = {
  // Crear un usuario:
  userSave: async (req, res) => {
    try {
      let { username, password } = req.body;
      let user = await new User({
        username,
        password,
      }).save();
      res.status(201).json(user); // Código 201: Recurso creado
    } catch (error) {
      console.log({ userSave_error: error.message });
      res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Buscar todos los usuarios:
  userGet: async (req, res) => {
    try {
      let users = await User.find({});
      if (!users.length) {
        return res.status(404).json({ message: "No hay usuarios" }); // Código 404: No encontrado
      }
      return res.status(200).json(users); // Código 200: Éxito
    } catch (error) {
      console.log({ userGet_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Buscar un usuario por Id:
  userGetId: async (req, res) => {
    try {
      let userId = req.params.id;
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json(user); // Código 200: Éxito
    } catch (error) {
      console.log({ userGetId_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Actualizar un usuario por Id:
  userPutId: async (req, res) => {
    try {
      let userId = req.params.id;
      let { username, password } = req.body;
      let user = await User.findByIdAndUpdate(
        userId,
        { username, password },
        { returnDocument: "after" }
      );
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json(user); // Código 200: Éxito
    } catch (error) {
      console.log({ userPutId_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Eliminar un usuario:
  userDelete: async (req, res) => {
    try {
      let userId = req.params.id;
      let user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" }); // Código 404: No encontrado
      }
      return res.status(200).json({ message: "Usuario eliminado" }); // Código 200: Éxito
    } catch (error) {
      console.log({ userDelete_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },

  // Eliminar todos los usuarios:
  userDeleteAll: async (req, res) => {
    try {
      let result = await User.deleteMany();
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "No hay usuarios a eliminar" }); // Código 404: No encontrado
      }
      return res.status(200).json({ deletedCount: result.deletedCount }); // Código 200: Éxito
    } catch (error) {
      console.log({ userDeleteAll_error: error.message });
      return res.status(500).json({ error: error.message }); // Código 500: Error interno del servidor
    }
  },
};

module.exports = controller;
