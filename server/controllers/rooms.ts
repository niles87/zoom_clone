import { Request, Response } from "express";
import Room, { IRoomModel } from "../model/Room";

export const rooms = {
  seeRooms: function (req: Request, res: Response) {
    Room.find({}).then((rooms) => res.json(rooms));
  },
  create: function (req: Request, res: Response) {
    const { owner } = req.body;
    Room.create({ roomOwner: owner, memebers: [] })
      .then((room: IRoomModel) => {
        res.sendStatus(201);
      })
      .catch((err: any) => {
        console.log(err.message);
        res.sendStatus(418);
      });
  },
};
