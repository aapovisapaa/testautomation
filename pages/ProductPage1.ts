import { Page, Locator, expect } from '@playwright/test';

// Create Page Object Model to keep test suite maintainable
export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;

    // Create constructor with add to cart button
    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Lisää ostoskoriin'});
    }

    // Add method for adding product to cart
    async addProductToCart() {
        await this.addToCartButton.first().click();
        await expect(this.page.getByText(/Ostoskorissasi on 1 kpl tätä tuotetta/)).toBeVisible();
    }

    // Add method for navigating to cart
    // (Use direct URL navigation to ensure test stability)
    async goToCart() {
        await this.page.goto('/fi/cart');
    }
}