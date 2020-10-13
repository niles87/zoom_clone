export default interface AuthServiceI {
  login(id: string): void;
  logout(): void;
  getId(): string;
  loggedIn(id: string): boolean;
}
