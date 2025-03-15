const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

module.exports = mongoose;