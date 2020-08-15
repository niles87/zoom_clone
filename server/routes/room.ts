const room = require("express").Router();

room.route("/").get(() => "hello from roooms");

module.exports = room;
