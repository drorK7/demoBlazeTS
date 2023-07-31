import { Page } from 'playwright';

class CartPage {
  private page: Page;
  private placeOrderButton: string;
  public placeOrderModal: PlaceOrderModal;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderButton = 'button:text("Place Order")';
    this.placeOrderModal = new PlaceOrderModal(page); // Create an instance of PlaceOrderModal
  }

  async validateElement(selector: string): Promise<void> {
    try {
      const element = await this.page.waitForSelector(selector);
      expect(element).toBeTruthy(); // Assert that the element is found on the page
    } catch (error) {
      throw new Error(`Element with selector ${selector} not found.`);
    }
  }

  async cartTableValidate(productName: string): Promise<void> {
    const productNameSelector = `td:has-text("${productName}")`;
    await this.validateElement(productNameSelector);
  }

  async totalPriceValidate(price: string): Promise<void> {
    const totalPriceSelector = `.panel-title:has-text("${price}")`;
    await this.validateElement(totalPriceSelector);
  }

  async clickPlaceOrderButton(): Promise<void> {
    await this.page.click(this.placeOrderButton); // Fix the click method to use the correct selector
  }

  async clickCloseButton(): Promise<void> {
    await this.placeOrderModal.clickCloseButton(); // Call the clickCloseButton method from PlaceOrderModal
  }
}

class PlaceOrderModal {
  private page: Page;
  private closeButton: string;

  constructor(page: Page) {
    this.page = page;
    this.closeButton = 'div#orderModal button:text("Close")';
  }

  async validateElement(selector: string): Promise<void> {
    try {
      const element = await this.page.waitForSelector(selector);
      expect(element).toBeTruthy(); // Assert that the element is found on the page
    } catch (error) {
      throw new Error(`Element with selector ${selector} not found.`);
    }
  }

  async totalPriceModalValidate(price: string): Promise<void> {
    const totalPriceSelector = `#totalm:has-text("${price}")`;
    await this.validateElement(totalPriceSelector);
  }

  async clickCloseButton(): Promise<void> {
    await this.page.waitForSelector(this.closeButton);
    await this.page.click(this.closeButton);
  }
}

export { CartPage, PlaceOrderModal };
