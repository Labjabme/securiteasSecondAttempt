
Feature: 2023 Las Vegas Grand Prix Results Reporting

  As a BBC editor
  I want to report on the top 3 finishers of the 2023 Las Vegas Grand Prix
  So that readers get a clear and accurate summary of the race results

  Scenario: Verify and report top 3 finishers of 2023 Las Vegas Grand Prix
    Given I am on the BBC Sport homepage
    When I navigate to the Formula 1 section
    And I go to the Results page
    And I select the "2023" season
    And I choose the "Las Vegas Grand Prix"
    And the top 3 finishers should be:
      | Position | Driver           | Team     |
      | 1        | Max Verstappen   | Red Bull |
      | 2        | George Russell   | Mercedes |
      | 3        | Sergio Perez     | Red Bull |