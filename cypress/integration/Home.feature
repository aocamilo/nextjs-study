Feature: User can read home page text
  I want to be able to see what's in the home page

  Background: 
    Given I visit '/'
  
  Scenario: I should see the home page content
    Then I should see the text: 'This is an app made to study and understand some concepts about Nextjs, SSR, SSG, CSR, and more... Please use the nav.'

  Scenario: I can use the navbar to get to other pages
    When I click the 'Pokemon' 'link'
    Then the url should include '/pokemon'