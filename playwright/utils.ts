import { chromium, Browser, Page } from 'playwright';
import testConfig from './config';

async function setupBrowserPage(): Promise<{ browser: Browser, page: Page }> {
  const browser = await chromium.launch(testConfig.browserOptions);
  const page = await browser.newPage();
  return { browser, page };
}

async function setupTest(): Promise<{ browser: Browser, page: Page }> {
  const { browser, page } = await setupBrowserPage();
  return { browser, page };
}

async function searchAndClickNextPage(page: Page, searchText: string): Promise<void> {
  while (true) {
    // Check if the search text exists on the current page
    const searchElement = await page.$(`.hrefch:has-text("${searchText}")`);
    if (searchElement) {
      // If found, click on it
      await searchElement.click();
      break;
    }

    // Check if the "Next Page" button exists
    const nextPageButton = await page.$('#next2');
    if (nextPageButton) {
      // Click on "Next Page" button and wait for navigation
      await nextPageButton.click();
      await page.waitForNavigation();
    } else {
      // Break the loop if "Next Page" button is not found
      break;
    }
  }
}

async function deleteOrders(page: Page): Promise<void> {
  while (await page.$('.success')) {
    await page.click('a[href="#"]:has-text("Delete")');
    await page.waitForTimeout(5000);
  }
}

export { setupTest, searchAndClickNextPage, deleteOrders };
