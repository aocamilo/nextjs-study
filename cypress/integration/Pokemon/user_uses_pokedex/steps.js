import { Then, When } from "cypress-cucumber-preprocessor/steps";

When("I see the initial pokemons", () => {
  cy.get("[data-cy=pokemon-card]")
    .should("exist")
    .should("have.length", 20)
    .first()
    .invoke("text")
    .then((text) => text.split(" ")[1])
    .as("firstPokemon");
});

When("I should not see the initial pokemon", () => {
  cy.get("@firstPokemon").then((pokemon) => {
    cy.findByText(pokemon).should("not.exist");
  });
});

Then("I see the initial pokemon", () => {
  cy.get("@firstPokemon").then((pokemon) => {
    cy.findByText(pokemon).should("exist").should("be.visible");
  });
});

When("I go to the {string} pokedex page", (page) => {
  cy.findByText(page).click();
});
