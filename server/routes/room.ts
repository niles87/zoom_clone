import { Router as router } from "express";
import { rooms } from "../controllers/rooms";

const room = router();
room.route("/").get(rooms.seeRooms);

export default room;
