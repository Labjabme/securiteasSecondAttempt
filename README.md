SECURITEASE - QE TECH ASSESSMENT

# SECURITEASE - QE Tech Assessment

This project is a comprehensive automation suite for the SECURITEASE QE Tech Assessment, covering both front-end and back-end testing. It utilizes Playwright TypeScript, Cucumber, and the Page Object Model to ensure a scalable and maintainable test framework.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Tests](#running-the-tests)
   - [Front-end Tests](#front-end-tests)
   - [Back-end Tests](#back-end-tests)
4. [Reporting](#reporting)
5. [Contributing](#contributing)
6. [License](#license)

## Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/securiteas-assessment-automation.git
   ```
2. Navigate to the project directory:
   ```
   cd securiteas-assessment-automation
   ```
3. Install dependencies:
   ```
   npm install
   ```
      ```
   npx playwright install
   ```
## Running the Tests
To run the tests, use the following command:
```
npm test
```
This will execute the Cucumber feature files and generate a report using the `generate-report.js` script.

## Reporting
After running the tests, the results will be generated in an HTML report located at `cucumber-report.html`. This report provides a detailed overview of the test execution, including passed, failed, and skipped scenarios.

## Contributing
Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).