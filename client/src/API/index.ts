import { newUser, existingUser } from "../Interface/user";

class Api {
  // eslint-disable-next-line
  constructor() { }
  async viewRooms(): Promise<Response> {
    return await fetch("/room");
  }
  async createRoom(owner: string): Promise<Response> {
    return await fetch("/room/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner }),
    });
  }
  async addMemberToRoom(id: string, member: existingUser): Promise<Response> {
    return await fetch(`/room/addMember/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(member)
    })
  }
  async signup(newUser: newUser): Promise<Response> {
    return await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  }
  async login(user: existingUser): Promise<Response> {
    return await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
  async logout(id: string): Promise<Response> {
    return await fetch(`/user/logout/${id}`, {
      method: "PUT",
    })
  }
  async getFriends(id: string): Promise<Response> {
    return await fetch(`/user/friends/${id}`, {
      method: "GET",
    })
  }
  async getUserInfo(id: string): Promise<Response> {
    return await fetch(`/user/${id}`)
  }
}

export default new Api()