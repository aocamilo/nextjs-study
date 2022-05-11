Feature: User uses pokedex
  I want to be able to use the pokedex

  Background:
    Given I visit '/pokemon'

  Scenario: I see the first tab pokemons
    Then I should see the text: 'Pokedex'
    And I should see 'charizard' pokemon

  Scenario: I see different pokemons when changing pokedex's page
    When I go to the 'Next' pokedex page
    Then I should not see 'charizard' pokemon
    And I should see 'pikachu' pokemon
    Then I go to the 'Previous' pokedex page
    Then I should not see 'pikachu' pokemon
    And I should see 'charizard' pokemon