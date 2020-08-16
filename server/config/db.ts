// require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

export const config = {
  database: process.env.DB_CONNECTION,
};
