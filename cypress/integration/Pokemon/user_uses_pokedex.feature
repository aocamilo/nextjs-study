Feature: User uses pokedex
  I want to be able to use the pokedex

  Scenario: I see the first tab pokemons
    Given I visit '/pokemon'

    Then I should see the text: 'Pokedex'
    And I see the initial pokemons

  Scenario: I see different pokemons when changing pokedex's page
    Given I visit '/pokemon'

    When I see the initial pokemons
    And I go to the 'Next' pokedex page
    Then I should not see the initial pokemon
    Then I go to the 'Previous' pokedex page
    And I see the initial pokemon