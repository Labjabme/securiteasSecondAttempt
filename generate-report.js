const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome 89.0.4389.82",
    "Platform": "Mac OS",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  },
  screenshotsDirectory: 'reports/screenshots/', // Define screenshots directory
  storeScreenshots: true, // Store screenshots in the HTML report
  scenarioTimestamp: true, // Add a timestamp to each scenario
  launchReport: true, // Automatically open the report after it's generated
  cucumberJson: {
    jsonDir: 'reports/cucumber-json/', // Directory to store the JSON files
    reportPath: 'reports/cucumber-json/' // Directory to store the JSON reports
  }
};

reporter.generate(options);