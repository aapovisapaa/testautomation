import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test('Should verify that key navigation and footer elements are visible', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // List first four product categories shown in navigation
    const navigationCategories = [
        'Tietotekniikka', 
        'Pelaaminen', 
        'Kuva ja ääni', 
        'Puhelimet, tabletit ja kellot', 
    ];
    
    // List some essential footer links 
    const footerLinks = [
        'Palautukset', 
        'Takuu ja huolto', 
        'Tuotteiden takaisinvedot', 
        'Saavutettavuusseloste',
        'Tietosuojaseloste'
    ];

    // Go to page and accept cookies
    await searchPage.goto();
    await searchPage.acceptCookies();

    // Check that navigation categories are visible
    for (const text of navigationCategories) {
        const navLink = page.locator('nav').getByRole('link', { name: new RegExp(text, 'i') });
        await expect(navLink.first()).toBeVisible();
    }

    // Check that footer links are visible
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);
    for (const text of footerLinks) {
        const footerLink = page.locator('footer').getByRole('link', { name: new RegExp(text, 'i') });
        await expect(footerLink).toBeVisible();
    }
});
