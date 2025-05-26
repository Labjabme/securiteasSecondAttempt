module.exports = {
    default: {
      timeout: 100000, // Global timeout for steps
      formatOptions: {
        snippetInterface: 'async-await' // Use async-await snippets
      },
      dryRun: false, // Don't skip the actual execution
      paths: [
        'src/test/features/*.feature' // Specify the path to your feature files
      ],
      require: [
        'src/test/steps/*.ts', // Include step definitions
        'support/world.ts' // Include custom World configuration
      ],
      requireModule: [
        'ts-node/register' // Use ts-node to support TypeScript
      ],
      format: ['progress', 'json:reports/cucumber_report.json'], // Format progress and output a JSON report
      baseURL: 'https://www.bbc.com/sport' // Add baseURL here
    }
  };
  