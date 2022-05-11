import { When } from "cypress-cucumber-preprocessor/steps";

When("I should see {string} pokemon", (pokemon) => {
  cy.findByText(pokemon).should("exist").should("be.visible");
});

When("I should not see {string} pokemon", (pokemon) => {
  cy.findByText(pokemon).should("not.exist");
});

When("I go to the {string} pokedex page", (page) => {
  cy.findByText(page).click();
});
