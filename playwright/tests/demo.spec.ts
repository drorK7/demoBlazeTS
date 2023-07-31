import { chromium, Page } from 'playwright';
import { setupTest, deleteOrders } from '../utils';
import CatalogPage from '../pages/catalogPage';
import { CartPage, PlaceOrderModal } from '../pages/cartPage';
import testConfig from '../config';
import { SignUpModal, LoginModal } from '../components/authComponent';
import ProductPage from '../pages/productPage';
import { validateViewData, validateCartData, addToCart, loginAPI } from '../api/apiRequest';

describe('This is a UI test flow containing several tests in 1 file.', () => {
  let catalogPage: CatalogPage;
  let productPage: ProductPage;
  let signUpModal: SignUpModal;
  let cartPage: CartPage;
  let username = testConfig.username;
  let password = testConfig.password;
  let loginModal: LoginModal;
  let placeOrderModal: PlaceOrderModal;
  let page: Page;

  beforeAll(async () => {
    const { page: testPage } = await setupTest();
    page = testPage;
    catalogPage = new CatalogPage(page);
    signUpModal = new SignUpModal(page);
    loginModal = new LoginModal(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    placeOrderModal = cartPage.placeOrderModal;
    await page.goto(testConfig.baseUrl);
  }, 10000);

  it('Create new user', async () => {
    await catalogPage.clickSignUpButton();
    await page.waitForSelector('#sign-username');
    await signUpModal.enterUsername(username);
    await signUpModal.enterPassword(password);
    await signUpModal.clickSignupButton();
  });

  it('Login to the system', async () => {
    await page.waitForSelector('[aria-labelledby="signInModalLabel"]', { state: 'hidden', timeout: 5000 });
    await catalogPage.clickLoginButton();
    await page.waitForSelector('#loginusername');
    await loginModal.enterUsername(username);
    await page.waitForSelector('#loginpassword');
    await loginModal.enterPassword(password);
    await loginModal.clickLoginButton();
  });

  it('Add Items to cart', async () => {
    await page.waitForSelector(productPage.getProductName('Nexus 6'));
    await productPage.pickItem('Nexus 6');
    await productPage.clickAddToCartButton();
    catalogPage.clickHomeHeaderButton();
    await page.waitForTimeout(1000);
    await productPage.clickNextPage();
    await productPage.pickItem('MacBook Pro');
    await productPage.clickAddToCartButton();
  });

  it('Move to cart and validate cart', async () => {
    await catalogPage.clickCartHeaderButton();
    await cartPage.cartTableValidate('Nexus 6');
    await cartPage.cartTableValidate('MacBook Pro');
    await cartPage.totalPriceValidate('1750');
  });

  it('Place an order', async () => {
    await cartPage.clickPlaceOrderButton();
    cartPage.placeOrderModal.totalPriceModalValidate('1750');
    cartPage.placeOrderModal.clickCloseButton();
    await deleteOrders(page);
  });

  it('API Testing', async () => {
    const loginResponse = await loginAPI(username, password);
    await addToCart(loginResponse);
    const cartData = await validateCartData(loginResponse);

    // Assertions on the response and its content
    expect(cartData.data).toBeDefined();
    expect(cartData.data.Items.length).toBe(1);

    // const cartViewresponse = await validateViewData(loginResponse, 1);
    const cartViewresponse = await validateViewData();
    expect(cartViewresponse.data).toBeDefined(); // Verify that the response is defined
    expect(cartViewresponse.data.id).toBe(3); // Verify a specific property in the response
    expect(cartViewresponse.data.price).toBe(650);
    expect(cartViewresponse.data.title).toBe('Nexus 6');
  });
});
