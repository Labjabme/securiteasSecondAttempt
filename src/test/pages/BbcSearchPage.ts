import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';  // Extend BasePage

export class BbcSearchPage extends BasePage {
  constructor(page: Page) {
    super(page);  // Call the BasePage constructor
  }

  // Navigate to the BBC homepage
  async navigateSearchPage() {
    console.log('Navigating to homepage...');
    await this.goto('https://www.bbc.com/sport');  // Use the goto method from BasePage
    console.log('Reached homepage, waiting for homepage element...');
    await expect(this.page.getByTestId('masthead')).toContainText('BBC Sport');
    console.log('Reached BBC Sports Page');
    await this.page.getByRole('link', { name: 'Search BBC' }).click();
    await this.page.getByPlaceholder('Search the BBC').click();
    
  }

async searchFor(query: string) {
    console.log(`Searching for: ${query}`);
    
    // Locate the search input and perform the search
    const searchInput = this.page.locator('input[type="search"]');
    await this.page.getByPlaceholder('Search the BBC').fill(query);
    await this.page.getByPlaceholder('Search the BBC').press('Enter');
    console.log(`Searched for ${query}`);

    // Wait for the search results to load in the 'main-content' section
    await this.page.waitForSelector('[data-testid="main-content"]');

    // Get the text content from the main-content area
    const mainContent = await this.page.getByTestId('main-content');
    const contentText = await mainContent.textContent();
    
    // Use a regex or delimiter to split the articles (assuming articles are separated by a consistent pattern)
    const articles = contentText?.match(/Published\d{1,2} \w+ \d{4}/g);  // Example: Matches 'Published25 December 2023'

    if (articles && articles.length >= 4) {
        console.log(`Found ${articles.length} articles in the main content.`);
    } else {
        throw new Error(`Expected at least 4 articles, but found ${articles ? articles.length : 0}`);
    }

    // Alternatively, use Playwright's expect API to assert
    expect(articles?.length).toBeGreaterThanOrEqual(4);
    console.log(`Assertion passed: Found ${articles.length} articles.`);
}

}
