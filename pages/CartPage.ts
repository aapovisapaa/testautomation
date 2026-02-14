import { Page, Locator, expect } from '@playwright/test';

// Create Page Object Model to keep test suite maintainable
export class CartPage {
    readonly page: Page;
    readonly cartHeader: Locator;
    readonly checkoutButton: Locator;

    // Create constructor with cart header and checkout button
    constructor(page: Page) {
        this.page = page;
        this.cartHeader = page.locator('h1');
        this.checkoutButton = page.getByRole('button', { name: /Siirry kassalle|Kassalle/i });
    }

    // Add method for verifying that the correct h1 header exists
    async verifyIsVisible() {
        await expect(this.cartHeader).toContainText('Ostoskori');
    }

    // Add method for proceeding to checkout with a button
    async proceedToCheckout() {
        await this.checkoutButton.first().waitFor({ state: 'visible' });
        await this.checkoutButton.first().click({ force: true });
    }
}