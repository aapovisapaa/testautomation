import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';


test('Price sorting should work correctly for Apple Watch', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Initialize test
    await searchPage.goto();
    await searchPage.acceptCookies();
    
    // Search for Apple Watch Ultra 3
    await searchPage.searchFor('Apple Watch Ultra 3');

    // Test ascending price sorting
    await searchPage.sortDropdown.selectOption('price:asc');
    await page.waitForURL(/sort=price%3Aasc/);
    //Short wait to make sure the page is showing the products
    await page.waitForTimeout(4000);
    // Get prices
    const cheapFirst = await searchPage.getAllProductPrices();
    // Assert that previous price should be less than or equal and go through prices
    for (let i = 0; i < cheapFirst.length - 1; i++) {
        expect(cheapFirst[i]).toBeLessThanOrEqual(cheapFirst[i + 1]);
    }

    // Test descending price sorting
    await searchPage.sortDropdown.selectOption('price:desc');
    await page.waitForURL(/sort=price%3Adesc/);
    //Short wait to make sure the page is showing the products
    await page.waitForTimeout(4000);
    // Get prices
    const expensiveFirst = await searchPage.getAllProductPrices();
    // Assert that previous price should be more than or equal and go through prices
    for (let i = 0; i < expensiveFirst.length - 1; i++) {
        expect(expensiveFirst[i]).toBeGreaterThanOrEqual(expensiveFirst[i + 1]);
    }
});
