Feature: REST Countries API Testing
  In order to validate the REST Countries API,
  We will test for schema validation, country count, and language validation.

  Scenario: Schema Validation
    Given I have access to the REST Countries API
    When I send a GET request to "/v3.1/all"
    Then the response should conform to the published schema


  Scenario: Confirmation of Countries
    Given I have access to the REST Countries API
    When I send a GET request to "/v3.1/all"
    Then the response should contain 195 countries
    

  Scenario: Validate Languages in South Africa
    Given I have access to the REST Countries API
    When I send a GET request to "/v3.1/alpha/ZAF"
    Then the response should include "South African Sign Language" as an official language

