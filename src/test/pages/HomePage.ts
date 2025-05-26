// 
import { expect, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
      console.log('Navigating to homepage...');
      await this.page.goto('https://www.bbc.com/sport', { timeout: 30000 });
      console.log('Reached homepage, waiting for homepage element...');
      await expect(this.page.getByTestId('masthead')).toContainText('BBC Sport');
      console.log('Reached BBC Sports Page');
      
  }
  

    async navigateToFormulaSection() {
       console.log('Navigation to Formala');
        await this.page.getByTestId('navigation').getByRole('link', { name: 'Formula' }).click();
        console.log('Clicked on the Formula navigation');
    }
}
