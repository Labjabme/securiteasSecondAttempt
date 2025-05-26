import { Given, When, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { Formula1Page } from '../pages/Formula1Page';
import { ResultsPage } from '../pages/ResultsPage';
import { RaceDetailsPage } from '../pages/RaceDetailsPage';

let homePage: HomePage;
let formula1Page: Formula1Page;
let resultsPage: ResultsPage;
let raceDetailsPage: RaceDetailsPage;

Given('I am on the BBC Sport homepage', { timeout: 10000 }, async function () { 
    if (!this.page) {
        throw new Error('Page is not initialized');
    }

    const homePage = new HomePage(this.page);
    await homePage.navigateToHomePage();
});

When('I navigate to the Formula 1 section',  async function () {
    const homePage = new HomePage(this.page!);
    await homePage.navigateToFormulaSection();
    
});

When('I go to the Results page', async function () {
    const formula1Page = new Formula1Page(this.page!);
    await formula1Page.navigateToResults();
    
});

When('I select the {string} season', async function (year: string) {
   const resultsPage = new ResultsPage(this.page);
    await resultsPage.selectYear(year);
});

When('I choose the {string}', async function (grandPrix: string) {
    const resultsPage = new ResultsPage(this.page);
    await resultsPage.selectGrandPrix(grandPrix);
    console.log(grandPrix)
    
});

Then('the top 3 finishers should be:', async function (dataTable) {
    const expectedResults = dataTable.hashes(); 
    const raceDetailsPage= new RaceDetailsPage(this.page!); 
    await raceDetailsPage.verifyTop3Finishers(expectedResults);
});
