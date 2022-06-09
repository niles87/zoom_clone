import { newUser, existingUser } from "../Interface/user";

class Api {
  baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:4000" || "";
  }
  async viewRooms(): Promise<Response> {
    return await fetch(this.baseUrl + "/room");
  }
  async createRoom(owner: string): Promise<Response> {
    return await fetch(this.baseUrl + "/room/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner }),
    });
  }
  async addMemberToRoom(id: string, member: existingUser): Promise<Response> {
    return await fetch(`${this.baseUrl}/room/addMember/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
  }
  async signup(newUser: newUser): Promise<Response> {
    return await fetch(this.baseUrl + "/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  }
  async login(user: existingUser): Promise<Response> {
    return await fetch(this.baseUrl + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
  async logout(id: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/user/logout/${id}`, {
      method: "PUT",
    });
  }
  async getFriends(id: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/user/friends/${id}`, {
      method: "GET",
    });
  }
  async getUserInfo(id: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/user/${id}`);
  }
}

export default new Api();
