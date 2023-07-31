import { Page } from 'playwright';

class SignUpModal {
  private page: Page;
  private userNameTextbox: string;
  private passwordTextbox: string
  private signUpButton: string;

  constructor(page: Page) {
    this.page = page;
    this.userNameTextbox = '#sign-username'
    this.passwordTextbox = '#sign-password'
    this.signUpButton = 'button:text("Sign up")'
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.userNameTextbox, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordTextbox, password);
  }

  async clickSignupButton(): Promise<void> {
    await this.page.click(this.signUpButton);
  }
}

class LoginModal {
  private page: Page;
  private userNameTextbox: string;
  private passwordTextbox: string;
  private loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.userNameTextbox = '#loginusername'
    this.passwordTextbox = '#loginpassword'
    this.loginButton = '#logInModal button:has-text("Log in")'
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.userNameTextbox, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordTextbox, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click('#logInModal button:has-text("Log in")');
  }
}

export { SignUpModal, LoginModal };
