import { Given, When, Then } from '@cucumber/cucumber';
import { BbcSearchPage } from '../pages/BbcSearchPage';
import { expect } from '@playwright/test';

let bbcSearchPage: BbcSearchPage;

Given('I am on the search page', { timeout: 10000 }, async function () {
    bbcSearchPage = new BbcSearchPage(this.page);  // Initialize BbcSearchPage
    await bbcSearchPage.navigateSearchPage();  // Navigate to the search page
    console.log("Arrived on Search page");
});

When('I search for {string}', { timeout: 10000 }, async function (searchTerm: string) {
    // Use BbcSearchPage to perform search
    console.log(`Initiating search for: ${searchTerm}`);
    bbcSearchPage = new BbcSearchPage(this.page);
    await bbcSearchPage.searchFor(searchTerm);
    console.log(`Entered Sports in}`);
});

Then('I should see at least {int} relevant results', async function (minResults: number) {
    // Wait for at least one result to appear
    await this.page.waitForSelector('[data-testid="default-promo"]', { timeout: 5000 });
    // Select all result elements
    const results = await this.page.$$('[data-testid="default-promo"]');
    console.log('Results found:', results.length);
    expect(results.length).toBeGreaterThanOrEqual(minResults);
});
