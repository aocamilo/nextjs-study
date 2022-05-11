Feature: User gets error message
  User should see error message if no chars are being fetched

  Background:
    Given I visit '/rickandmorty'

  Scenario: I see the fetch error message
    When I click the 'Fetch more' 'button'
    And I wait for the characters response
    Then I should see the text: 'error fetching characters...'