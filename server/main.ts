import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import http, { Server } from "http";
import * as io from "socket.io";

import { config } from "./config/db";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 4000;

const server: Server = http.createServer(app);
const ws = require("socket.io")(server);

const user: any = {};

const roomSocket: any = {};

ws.on("connection", (socket: io.Socket) => {
  socket.on("joining room", (roomId) => {
    if (user[roomId]) {
      user[roomId].push(socket.id);
    } else {
      user[roomId] = [socket.id];
    }
    roomSocket[socket.id] = roomId;

    const peopleInRoom = user[roomId].filter((id: string) => id !== socket.id);

    socket.emit("all users", peopleInRoom);
  });

  socket.on("sending signal", (payload) => {
    ws.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    ws.to(payload.callerID).emit("receiving signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomId = roomSocket[socket.id];
    let room = user[roomId];
    if (room) {
      room = room.filter((id: string) => id !== socket.id);
      user[roomId] = room;
    }
    socket.broadcast.emit("user disconnect", socket.id);
  });
});

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

server.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
