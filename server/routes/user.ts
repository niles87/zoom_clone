import { Router } from "express";
import { users } from "../controllers/users";

const user = Router();
user.route("/signup").post(users.signup);
user.route("/login").post(users.login);

export default user;
