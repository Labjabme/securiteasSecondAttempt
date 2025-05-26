import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from '@playwright/test';
import Ajv from 'ajv'; // For schema validation
import schema from '../schemas/restcountries_schema.json';


let response: any;

Given('I have access to the REST Countries API', async function () {
  // Prepare or initialize if needed
});

When('I send a GET request to {string}', async function (endpoint: string) {
  response = await axios.get(`https://restcountries.com${endpoint}`);
});

Then('the response should conform to the published schema', function () {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(response.data);
  expect(valid).toBe(true);
  console.log('Schema validation result:', valid);
});

Then('the response should contain {int} countries', function (expectedCount: number) {
  const countryCount = response.data.length;
  expect(countryCount).toBe(expectedCount);
  console.log('Total number of countries:', countryCount);
});

Then('the response should include {string} as an official language', function (language: string) {
    const officialLanguages = response.data[0].languages;
    
    // Log the languages to debug
    console.log('Official languages returned by API:', officialLanguages);
  
    // Check if the expected language is present
    expect(Object.values(officialLanguages)).toContain(language);
    console.log('Test passed: Found', language, 'in official languages');
  });
  
