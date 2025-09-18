// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

 Cypress.Commands.add('loginclientcompra', (email, password) => { 

    cy.visit('https://ticketazo.com.ar/auth/login')

cy.get('[data-cy="input-email"]').type(email)
  cy.get('[data-cy="input-password"]').type(password)
  cy.get('[data-cy="btn-login"]').click()


cy.wait(1000) 
cy.get('[data-cy="btn-ver-evento-1"]').click()


cy.contains('button', 'Adquirir entrada')
  .scrollIntoView()
  .click({ force: true })



 })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })