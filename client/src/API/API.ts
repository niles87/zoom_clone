import { user, existingUser } from "../Interface/user";

export default {
  viewRooms: async function (): Promise<Response> {
    return await fetch("/room");
  },
  createRoom: async function (owner: string): Promise<Response> {
    return await fetch("/room/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: owner,
    });
  },
  signup: async function (newUser: user): Promise<Response> {
    return await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  },
  login: async function (user: existingUser): Promise<Response> {
    return await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  },
};
