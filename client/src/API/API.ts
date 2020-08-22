interface user {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
interface existingUser {
  email: string;
  password: string;
}

export default {
  viewRooms: async function () {
    return await fetch("/room");
  },
  createRoom: async function (owner: string) {
    return await fetch("/room/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: owner,
    });
  },
  signup: async function (newUser: user) {
    return await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  },
  login: async function (user: existingUser) {
    return await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  },
};
