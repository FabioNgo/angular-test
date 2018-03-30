export class States {
  private static loggedIn = true;
  public static LogIn(): void {
    this.loggedIn = true;
  }
  public static LogOut(): void {
    this.loggedIn = false;
  }
  public static isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
