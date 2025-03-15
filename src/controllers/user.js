"use strict";

let User = require("../models/user");

//creamos un objeto para disponer de todos los metodos de ruta que vamos a definir:

let controller = {
  //Crear un usuario:
  userSave: async (req, res) => {
    try {
      let { username, password } = req.body;
      let user = await new User({
        username,
        password,
      }).save();
      res.status(200).json(user);
    } catch (error) {
      console.log({ userSave_error: error.message });
      res.send({ error: error.message });
    }
  },
  // .then((provider) => {User.populate(provider, {path: "user"})})
  //Buscar todos los usuarios:
  userGet: async (req, res) => {
    await User.find({})
      .then((users) => {
        if (!users.length) return res.send({ message: "No hay usuarios" });
        return res.send(users);
      })
      .catch((error) => {
        console.log({ userGet_error: error.message });
        return res.send({ error: error.message });
      });
  },

  //Buscar un usuario por Id:
  userGetId: async (req, res) => {
    try {
      let userId = req.params.id;
      await User.find({ _id: userId }).then((user) => {
        if (!user) return res.send({ message: "No hay usuarios" });
        return res.send(user);
      });
    } catch (error) {
      console.log({ userGetId_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Actualizar un usuario por Id:
  userPutId: async (req, res) => {
    try {
      let userId = req.params.id;
      let { username, password } = req.body;
      await User.findByIdAndUpdate(
        userId,
        { username, password },
        { returnDocument: "after" }
      ).then((user) => {
        if (!user) return res.send({ message: "Usuario no existe" });
        return res.send(user);
      });
    } catch (error) {
      console.log({ userPutId_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Eliminar un usuario:
  userDelete: async (req, res) => {
    try {
      let userId = req.params.id;
      await User.findOneAndDelete({ _id: userId }).then((user) => {
        if (!user) {
          return res.send({ message: "Usuario no encontrado" });
        }
        return res.send({ message: "usuario eliminado" });
      });
    } catch (error) {
      console.log({ userDelete_error: error.message });
      return res.send({ error: error.message });
    }
  },

  //Eliminar Todos los usuarios:
  userDeleteAll: async (req, res) => {
    try {
      await User.deleteMany().then((user) => {
        if (!user) {
          return res.send({ message: "No hay usuarios a eliminar" });
        }
        return res.send({ userDeleteAll: user.deletedCount });
      });
    } catch (error) {
      console.log({ userDeleteAll_error: error.message });
      return res.send({ error: error.message });
    }
  },
};

module.exports = controller;
