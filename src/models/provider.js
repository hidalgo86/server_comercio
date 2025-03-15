"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const providerSchema = new Schema({
  razonSocial: {
    type: String,
    required: true,
    // validate: [(username)=>{return username === "Hidalgo"}, "Solo acepta Hidalgo"]
  },
  name: {
    type:String,
    required: true,
    // validate: [(username)=>{return username === "Hidalgo"}, "Solo acepta Hidalgo"]
  },
  telf: {
    type:Number,
    required: true,
    // validate: [(username)=>{return username === "Hidalgo"}, "Solo acepta Hidalgo"]
  },
  email: {
    type:String,
    required: true,
    // validate: [(username)=>{return username === "Hidalgo"}, "Solo acepta Hidalgo"]
  },
  user: {
     type: Schema.ObjectId, 
     required: true,
     ref: "User" }
});

providerSchema.set("toJSON", {
  transform: (document, returnedObjetc) => {
    returnedObjetc.id = returnedObjetc._id
    delete returnedObjetc._id
    delete returnedObjetc.__v
  }
})

module.exports = model("Provider", providerSchema);