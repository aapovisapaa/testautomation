import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test('Find and verify Nikon Z30', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Open verkkokauppa.com website and search for "Nikon"
    await searchPage.goto();

    // Accept cookies if required
    await searchPage.acceptCookies();

    // Search for "Nikon"
    await searchPage.searchFor('Nikon');

    // Sort search results from highest to lowest price
    await searchPage.sortByPriceDescending();
    
    // Select second product from sorted results and click on it
    const secondProduct = searchPage.productLinks.nth(1);
    await secondProduct.click();

    // Verify product name
    const productTitle = page.locator('h1');
    await expect(productTitle).toContainText('Nikon Z30');
});