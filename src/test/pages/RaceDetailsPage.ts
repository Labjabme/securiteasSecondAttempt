
import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RaceDetailsPage extends BasePage {
  async verifyTop3Finishers(expectedResults: Array<{ Position: string; Driver: string; Team: string }>) {
    const rows = this.page.getByRole('table', { name: 'Race result' }).locator('tr');

    for (const expected of expectedResults) {
      const matchingRow = rows.filter({
        has: this.page.locator([
          `text=${expected.Position}`,
          `text=${expected.Driver}`,
          `text=${expected.Team}`
        ].join(' '))
      });

      console.log(`Validating row for: ${expected.Position} | ${expected.Driver} | ${expected.Team}`);
      await expect(matchingRow).toHaveCount(1);
    }
  }
}
