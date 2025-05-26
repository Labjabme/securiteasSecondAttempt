// import { expect } from "@playwright/test";
// import { BasePage } from "./BasePage";

// export class RaceDetailsPage extends BasePage {

//   async verifyTop3Finishers(expectedResults: Array<{ Position: string; Driver: string; Team: string }>) {
//     const table = this.page.getByRole('table', { name: 'Race result' });
//     console.log('Verifying top 3 finishers:', expectedResults);

//     for (const expected of expectedResults) {
//         // Locate the row by position
//         const row = table.locator('tr').filter({ hasText: expected.Position });

//         // Check if the row contains the expected Driver and Team
//         const driverLocator = row.locator('td').filter({ hasText: expected.Driver });
//         const teamLocator = row.locator('td').filter({ hasText: expected.Team });

//         // Ensure the position matches
//         await expect(row).toContainText(expected.Position);

//         // Compare the driver and team with expected values, log mismatches
//         if (await driverLocator.count() === 0) {
//             console.log(`Driver mismatch: Expected ${expected.Driver}, but not found.`);
//             await expect(driverLocator).toContainText(expected.Driver); // This will throw the error for the mismatch
//         }

//         if (await teamLocator.count() === 0) {
//             console.log(`Team mismatch: Expected ${expected.Team}, but not found.`);
//             await expect(teamLocator).toContainText(expected.Team); // This will throw the error for the mismatch
//         }
//     }
//   }
// }

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
