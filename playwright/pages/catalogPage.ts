import { Page } from 'playwright';

class CatalogPage {
  private page: Page;
  private signUpButton: string;
  private loginButton: string;
  private homeHeaderButtonSelector: string;
  private cartHeaderButtonSelector: string;
  private logoutHeaderButtonSelector: string;
  private userNameElementSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = '#signin2';
    this.loginButton = '#login2';
    this.homeHeaderButtonSelector = 'a[href]:has-text("Home")';
    this.cartHeaderButtonSelector = '#cartur';
    this.logoutHeaderButtonSelector = 'a[href]:has-text("Log out")';
    this.userNameElementSelector = '#nameofuser';
  }

  async clickSignUpButton(): Promise<void> {
    await this.page.click(this.signUpButton);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  async clickHomeHeaderButton(): Promise<void> {
    await this.page.click(this.homeHeaderButtonSelector);
  }

  async clickCartHeaderButton(): Promise<void> {
    await this.page.click(this.cartHeaderButtonSelector);
  }

  async clickLogoutHeaderButton(): Promise<void> {
    await this.page.click(this.logoutHeaderButtonSelector);
  }
}

export default CatalogPage;
