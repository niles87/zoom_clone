const user = require("express").Router();

user.route("/").post(() => "hello");

module.exports = user;
