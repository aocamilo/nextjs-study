import { Before, When } from "cypress-cucumber-preprocessor/steps";

Before(() => {
  cy.intercept("GET", "https://rickandmortyapi.com/api/character?page=2", {
    error: "error fetching characters...",
  }).as("getChars");
});

When("I wait for the characters response", () => {
  cy.wait("@getChars");
});
