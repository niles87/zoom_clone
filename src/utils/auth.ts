import AuthServiceI from "../Interface/auth";

class AuthService implements AuthServiceI {
  login(id: string): void {
    localStorage.setItem("id", id);
  }
  logout(): void {
    localStorage.removeItem("id");
  }
  getId(): string {
    const id = localStorage.getItem("id");
    return id ? id : "";
  }
  loggedIn(id: string): boolean {
    if (id === this.getId()) {
      return true;
    }
    return false;
  }
}

export default new AuthService();
