"use strict";

const mongoose = require("mongoose");
const { countDocuments } = require("./provider");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: String,
  name: String,
  price: Number,
  codigo: Number,
  stock: Number,
  vencimiento: String,
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: "User",
  },
  provider: {
    type: Schema.ObjectId,
    required: true,
    ref: "Provider",
  },
});

productSchema.set("toJSON", {
  transform: (document, returnedObjetc) => {
    returnedObjetc.id = returnedObjetc._id;
    delete returnedObjetc._id;
    delete returnedObjetc.__v;
  },
});

module.exports = mongoose.model("Product", productSchema);
