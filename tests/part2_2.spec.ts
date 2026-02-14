import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

// I generated a list of some user input strings that can cause problems with Google Gemini
const edgeCases = [
    // 1. Long string
    'B'.repeat(1000),
    // 2. Long number
    '999999999999999999999999999999.9999999999',
    // 3. Combined mathematical and currency symbols from various locales
    '±§×÷¶ΔΩ∑√∞≈≠≤≥€$£¥₹₽₪₩',
    // 4. Mixed numeric and non-standard alphanumeric characters
    '0123456789⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉'
];

for (const term of edgeCases) {
    test(`Should handle no results gracefully for: "${term}"`, async ({ page }) => {
        const searchPage = new SearchPage(page);

        // Go to page and accept cookies
        await searchPage.goto();
        await searchPage.acceptCookies();

        // Do the search
        await searchPage.searchFor(term);

        // Check that the page correctly shows "No results"
        const noResultsMessage = page.getByText(/Tarkista oikeinkirjoitus tai kokeile muita hakusanoja/i);
        await expect(noResultsMessage).toBeVisible();
    }
);
}