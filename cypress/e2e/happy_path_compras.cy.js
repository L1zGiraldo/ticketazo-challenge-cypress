describe('happy path compras', () => {
  it('Happy path', () => {
    cy.visit('https://ticketazo.com.ar/auth/login')

    const email = 'lizgiraldo@utp.edu.co'
    const password = 'Ticketazo4$%&.liz'

    cy.loginclientcompra(email, password)


   cy.get('[style*="background-color: rgb(168, 107, 230)"]').click()

   cy.wait(1000)
  cy.get('[title="Fila 3, Columna 7"]').click()
 

  cy.wait(1000) 
  cy.get('.w-full > span').click()
cy.wait(1000)
  cy.get('.mt-6 > .z-0').click()
  })
})