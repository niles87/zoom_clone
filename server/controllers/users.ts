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
        console.log(err.message);
        res.sendStatus(404);
      });
  },
  login: function (req: Request, res: Response) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user: IUserModel | null) => {
        if (user) {
          if (user.comparePassword(password)) {
            res.json("logged in");
          }
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err: any) => {
        console.log(err.message);
        res.sendStatus(500);
      });
  },
};
