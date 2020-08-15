import { Document, Model, model, Types, Schema, Query } from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

interface IUserSchema extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isOnline: boolean;
}

UserSchema.pre<IUserSchema>("save", async function () {
  if (this.isNew || this.isModified("password")) {
    const salt = 12;
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export interface IUserModel extends IUserSchema {}

export default model<IUserModel>("User", UserSchema);
