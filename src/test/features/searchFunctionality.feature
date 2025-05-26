Feature: Search Results Retrieval

  As an editor
  I want the search functionality to return at least 4 relevant results whenever someone searches for "Sport in 2023"
  So that users have a wide range of articles, reports, and media to explore on the topic.

  Scenario: Retrieve Search Results
    Given I am on the search page
    When I search for "Sport in 2023"
    Then I should see at least 4 relevant results
