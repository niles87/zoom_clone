import { Express, Request, Response } from "express";
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const config = require("./config/db");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("connected to db");
});

mongoose.connection.on("error", (err: any) => {
  console.log(`database error ${err}`);
});

app.use("/user", routes.users);
app.use("/room", routes.rooms);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
