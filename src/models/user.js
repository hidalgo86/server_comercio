"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    // validate: [(username)=>{return username === "Hidalgo"}, "Solo acepta Hidalgo"]
  },
  password: {
    type:Number,
    required: true,
    // validate: [(username)=>{return username === "Hidalgo"}, "Solo acepta Hidalgo"]
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObjetc) => {
    returnedObjetc.id = returnedObjetc._id
    delete returnedObjetc._id
    delete returnedObjetc.__v
  }
})

module.exports = model("User", userSchema);
