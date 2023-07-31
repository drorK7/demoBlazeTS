import { Page } from 'playwright';

class ProductPage {
  private page: Page;
  private addToCartButton: string;
  private nextPageSelector: string;
  private productNameSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = 'a[href="#"]:has-text("Add to cart")';
    this.nextPageSelector = 'button#next2';
  }

  getProductName(productName: string): string {
    this.productNameSelector = `.hrefch:has-text("${productName}")`;
    return this.productNameSelector;
  }

  async clickAddToCartButton(): Promise<void> {
    await this.page.click(this.addToCartButton);
  }

  async pickItem(itemName: string): Promise<void> {
    await this.page.click(this.getProductName(itemName));
  }

  async clickNextPage(): Promise<void> {
    await this.page.click(this.nextPageSelector, { force: true });
  }
}

export default ProductPage;
