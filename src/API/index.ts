import { newUser, existingUser } from "../Interface/user";

class Api {
  baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:4000" || "";
  }
  async viewRooms(): Promise<Response> {
    return await fetch(this.baseUrl + "/");
  }
  async createRoom(owner: string): Promise<Response> {
    return await fetch(this.baseUrl + "/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner }),
    });
  }
  async addMemberToRoom(id: string, member: existingUser): Promise<Response> {
    return await fetch(`${this.baseUrl}/addMember/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
  }
  async signup(newUser: newUser): Promise<Response> {
    return await fetch(this.baseUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  }
  async login(user: existingUser): Promise<Response> {
    return await fetch(this.baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
  async logout(id: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/logout/${id}`, {
      method: "PUT",
    });
  }
  async getFriends(id: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/friends/${id}`, {
      method: "GET",
    });
  }
  async getUserInfo(id: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/${id}`);
  }
}

export default new Api();
