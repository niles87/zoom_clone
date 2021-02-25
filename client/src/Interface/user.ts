export interface existingUser {
  email: string;
  password: string;
}

export interface user extends existingUser {
  firstName: string;
  lastName: string;
  username: string;
  friends?: Array<string>;
}

export interface loggedIn extends user {
  id: string;
  isOnline: boolean;
}
