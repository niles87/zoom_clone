import { Router } from "express";
import { users } from "../controllers/users";

const user = Router();
user.route("/signup").post(users.signup);
user.route("/login").post(users.login);
user.route("/friends/:id").get(users.getFriends);

export default user;
