export interface existingUser {
  email: string;
  password: string;
}

export interface newUser extends existingUser {
  firstName: string;
  lastName: string;
  username: string;
  friends?: Array<string>;
}

export interface loggedIn extends newUser {
  id: string;
  isOnline: boolean;
}

export interface user {
  _id: string;
  isOnline: boolean;
  username: string;
  email: string;
}