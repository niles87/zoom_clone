import { Request, Response } from "express";
import User, { IUserModel } from "../model/User";

export const users = {
  signup: function (req: Request, res: Response) {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    User.create(newUser)
      .then((user: IUserModel) => {
        res.json({ username: user.username });
      })
      .catch((err: any) => {
        console.error(err.message);
        res.sendStatus(404);
      });
  },
  login: function (req: Request, res: Response) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user: IUserModel | null) => {
        if (user) {
          if (user.comparePassword(password)) {
            res.json({ username: user.username, id: user._id });
          }
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err: any) => {
        console.error(err.message);
        res.sendStatus(500);
      });
  },
};
