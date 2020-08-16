import { Request, Response } from "express";
import Room from "../model/Room";

export const rooms = {
  seeRooms: function (req: Request, res: Response) {
    Room.find({}).then((rooms) => res.json(rooms));
  },
};
