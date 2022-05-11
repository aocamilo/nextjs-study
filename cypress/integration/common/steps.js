import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I visit {string}", (page) => {
  cy.visit(page);
});

Then("I should see the text: {string}", (text) => {
  cy.findByText(text);
});

Then("the url should include {string}", (val) => {
  cy.url().should("include", val);
});

When("I click the {string} {string}", (name, role) => {
  cy.findByRole(role, { name: name }).click();
});
