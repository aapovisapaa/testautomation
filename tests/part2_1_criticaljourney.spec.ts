import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage1';
import { CartPage } from '../pages/CartPage';

test('Find Samsung Galaxy S25, add to cart and proceed to checkout', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Search for specific Samsung Galaxy S25 model
    await searchPage.goto();
    await searchPage.acceptCookies();
    await searchPage.searchFor('Samsung Galaxy S25 5G puhelin, 128/12 Gt, Blueback');

    // Select the first product from search results
    await searchPage.productLinks.first().click();

    // Add product to cart and navigate to cart page
    await productPage.addProductToCart();
    await productPage.goToCart();

    // Verify correct page
    await cartPage.verifyIsVisible();

    // Check that the cart has the right product
    await expect(page.locator('a[title="Samsung Galaxy S25 5G puhelin, 128/12 Gt, Blueblack"]')).toBeVisible();

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Verify correct page
    await expect(page.getByRole('heading', { name: /Jatka tilaamista kirjautumalla sisään/i })).toBeVisible();
}
)