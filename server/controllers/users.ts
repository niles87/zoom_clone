import { Request, Response } from "express";
import User, { IUserModel } from "../model/User";

export const users = {
  signup: function (req: Request, res: Response) {
    let newUser = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    User.create(newUser)
      .then((user: IUserModel) => {
        res.sendStatus(201);
      })
      .catch((err: any) => {
        res.sendStatus(404);
      });
  },
};
