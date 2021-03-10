import { newUser, existingUser } from "../Interface/user";

export const Api = {
  viewRooms: async function (): Promise<Response> {
    return await fetch("/room");
  },
  createRoom: async function (owner: string): Promise<Response> {
    return await fetch("/room/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: owner,
    });
  },
  addMemberToRoom: async function (id: string, member: existingUser): Promise<Response> {
    return await fetch(`/room/addMember/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(member)
    })
  },
  signup: async function (newUser: newUser): Promise<Response> {
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
  logout: async function (id: string): Promise<Response> {
    return await fetch(`/user/logout/${id}`, {
      method: "PUT",
    })
  },
  getFriends: async function (id: string): Promise<Response> {
    return await fetch(`/user/friends/${id}`, {
      method: "GET",
    })
  },
  getUserInfo: async function (id: string): Promise<Response> {
    return await fetch(`/user/${id}`)
  }
};
