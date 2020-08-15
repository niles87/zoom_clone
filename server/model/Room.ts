import { Document, model, Schema, Types } from "mongoose";
import User from "./User";

const RoomSchema = new Schema({
  roomOwner: {
    type: String,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

interface IRoomSchema extends Document {
  roomOwner: string;
  memebers: Types.Array<string>;
}

export interface IRoomModel extends IRoomSchema {}

export default model<IRoomSchema>("Room", RoomSchema);
