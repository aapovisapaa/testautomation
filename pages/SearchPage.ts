import { Page, Locator, expect } from '@playwright/test';

// Create Page Object Model to keep test suite maintainable
export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly sortDropdown: Locator;
    readonly productLinks: Locator;

    // Create constructor with relevant locators
    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Hae kaupasta');
        this.sortDropdown = page.locator('#sort_select');
        this.productLinks = page.locator('article[data-product-id] h3 a');
    }

    // Add method for accepting cookies. 
    // (Use try-catch to ensure test continues if cookie popup does not appear)
    async acceptCookies() {
        const acceptButton = this.page.getByRole('button', { name: 'Hyväksy kaikki' });
        try {
            await acceptButton.waitFor({ state: 'visible', timeout: 3000 });
            await acceptButton.click();
        } catch (e) {
            console.log("Accept cookies window did not appear.");
        }
    }

    async goto() {
        await this.page.goto('/');
    }
    
    // Add methods for completing search and sort tasks
    async searchFor(term: string) {
        await this.searchInput.fill(term);
        await this.page.keyboard.press('Enter');
    }

    async sortByPriceDescending() {
        await this.sortDropdown.selectOption('price:desc');

        // Wait until results are sorted by checking URL parameter
        await this.page.waitForURL(/sort=price%3Adesc/);
    }
}