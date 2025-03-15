"use strict";

var express = require("express");
var router = express.Router();
var Authorization = require("../controllers/authorization");

router.post("/user/authorization", Authorization.auth);

module.exports = router;
