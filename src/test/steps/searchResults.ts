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
    const resultElements = this.page.locator('.search-results .search-result');  // Select result elements
    
    // Check if there are at least the minimum number of results
    const resultCount = await resultElements.count();
    console.log(`Found ${resultCount} search results.`);
    expect(resultCount).toBeGreaterThanOrEqual(minResults);  // Assert there are enough results
});
