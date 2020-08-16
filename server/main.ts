import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";

import { config } from "./config/db";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(config.database, {
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
