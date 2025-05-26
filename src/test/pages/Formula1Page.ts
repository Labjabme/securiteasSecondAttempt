import { BasePage } from './BasePage';

export class Formula1Page extends BasePage {
    async navigateToResults() {
        console.log('Clicking on the Results Tab');
        await this.page.getByRole('link', { name: 'Results' }).click();
        console.log('Clicked on the Results Tab');
    }

    async verifyFormula1PageLoaded() {
        await this.page.waitForSelector('#main-heading');
        const headingText = await this.page.locator('#main-heading').innerText();
        if (headingText !== 'Formula 1') {
            throw new Error(`Expected page heading to be 'Formula 1', but got '${headingText}'`);
        }
    }
}