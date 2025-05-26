import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { Status } from '@cucumber/cucumber';  // Import Status for checking test result

// Define a custom world class to manage browser, context, and page during tests
class CustomWorld {
  browser: Browser | null;           // Holds the browser instance (e.g., Chromium, Firefox, Webkit)
  context: BrowserContext | null;    // Holds the browser context (isolated environment for a test)
  page: Page | null;                 // Holds the current page instance being tested
  parameters: { browserType?: string; headless?: boolean; useBrowser?: boolean };  // Stores browser options
  testName: string;                  // Stores the name of the current test scenario

  // Constructor initializes the default values
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.parameters = { headless: true, useBrowser: true };  // Default parameters (headless and browser usage)
    this.testName = '';  // Placeholder for the test name
  }

  // Initialize the browser, context, and page based on parameters
  async init() {
    if (this.parameters.useBrowser !== false) {  // Only initialize if a browser is needed (i.e., not API tests)
      const browserType = this.parameters.browserType || 'chromium';  // Default to Chromium if no browser is specified
      const launchOptions = {
        headless: this.parameters.headless !== false  // Set headless mode based on the parameter
      };

      // Launch the browser based on the specified browser type (chromium, firefox, webkit)
      switch (browserType) {
        case 'firefox':
          this.browser = await firefox.launch(launchOptions);
          break;
        case 'webkit':
          this.browser = await webkit.launch(launchOptions);
          break;
        default:
          this.browser = await chromium.launch(launchOptions);
      }

      // Creates a new browser context (isolated environment) with video recording enabled
      this.context = await this.browser.newContext({
        recordVideo: { dir: 'reports/videos/' }  // Store videos in the 'reports/videos/' directory
      });

      // Creates a new page in the context for the test to run
      this.page = await this.context.newPage();
    } else {
      console.log('Skipping browser initialization for API tests.');  // Skip browser setup if running API tests
    }
  }

  // Cleanup after each test by closing the page, context, and browser
  async cleanup() {
    if (this.page) await this.page.close();  // Close the page if it exists
    if (this.context) await this.context.close();  // Close the context if it exists
    if (this.browser) await this.browser.close();  // Close the browser if it exists
  }
}

// Hook that runs before each test scenario
Before(async function (scenario) {
  this.testName = scenario.pickle.name;  // Capture the test name for logging and file naming
  console.log(`Starting test: ${this.testName}`);  // Log the name of the test being started
  await this.init();  // Initialize the browser, context, and page for the test
});

// Hook that runs after each test scenario
After(async function (scenario) {
  // If the test failed, capture a screenshot
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshotPath = `reports/screenshots/${this.testName.replace(/ /g, '_')}.png`;  // Create a file path for the screenshot
    await this.page.screenshot({ path: screenshotPath });  // Capture the screenshot
    console.log(`Screenshot captured: ${screenshotPath}`);  // Log the screenshot path
  }
  await this.cleanup();  // Cleanup the browser, context, and page after the test
});

// Set the world constructor to CustomWorld so each test gets its own instance
setWorldConstructor(CustomWorld);
