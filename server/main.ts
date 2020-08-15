const express = require("express");
const mongoose = require("mongoose");

const config = require("./config/db");
const app = express();
const PORT = 4000;

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

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
