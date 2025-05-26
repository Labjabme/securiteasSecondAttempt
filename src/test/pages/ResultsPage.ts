import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ResultsPage extends BasePage {
  async goToResultsPage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Results' }).click();
  }

  async validateResultsPageLoaded(): Promise<void> {
    await expect(this.page.locator('#main-heading')).toContainText('Formula 1 Results');
  }

  async selectYear(year: string): Promise<void> {
    console.log('Selecting the Year');
    await this.page.getByTestId(`datepicker-date-link-${year}`).click();
    await expect(this.page.getByTestId(`datepicker-date-link-${year}`)).toContainText(year);
    console.log('Clicked on the year Tab');
  }

  async validateYearSelected(year: string): Promise<void> {
    await expect(this.page.getByTestId(`datepicker-date-link-${year}`)).toContainText(year);
  }

  async selectGrandPrix(grandPrix: string): Promise<void> {
    console.log('Selecting GranPrix');

    await this.page.getByRole('button', { name: 'Las Vegas Grand Prix, Las' }).press('ArrowDown');
    console.log('Arrow Down');
    await this.page.getByRole('button', { name: 'Las Vegas Grand Prix, Las' }).click();
    console.log('Clicked Las Vegas Grand Prix, Las Button ');
    await expect(this.page.locator('#main-data')).toContainText('Las Vegas Grand Prix, Las Vegas Street CircuitLas Vegas Grand Prix, Las Vegas Street Circuit,19 November 2023');
    console.log('Assertion done ');
  }
}
