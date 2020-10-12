export interface user {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  friends?: Array<string>;
}
export interface existingUser {
  email: string;
  password: string;
}
