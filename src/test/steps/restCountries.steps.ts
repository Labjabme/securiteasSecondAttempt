import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from '@playwright/test';
import Ajv from 'ajv'; // For schema validation
import schema from '../schemas/restcountries_schema.json';
import addDraft6 from 'ajv/dist/2019.js'; // or use 'ajv/dist/ajv2019' if using Ajv v8+


let response: any;

Given('I have access to the REST Countries API', async function () {
  // Prepare or initialize if needed
});

When('I send a GET request to {string}', async function (endpoint: string) {
  response = await axios.get(`https://restcountries.com${endpoint}`);
});

Then('the response should conform to the published schema', function () {
  const ajv = new Ajv();
  // Add draft-06 meta-schema
  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
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

Then('the response should include {string} as an official language', async function (language: string) {
    const languages = response.data[0].languages
        ? Object.values(response.data[0].languages)
        : [];
    console.log('Retrieved languages:', languages);
    expect(
        languages,
        `Expected "${language}" to be in the list of official languages, but got: [${languages.join(', ')}]`
    ).toContain(language);
});

