import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to navigate to any URL
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
