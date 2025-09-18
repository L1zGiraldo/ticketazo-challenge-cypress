describe('happy path compras', () => {
  it('Happy path', () => {
    cy.visit('https://ticketazo.com.ar/auth/login')

    const email = 'lizgiraldo@utp.edu.co'
    const password = 'Ticketazo4$%&.liz'

    cy.loginclientcompra(email, password)


   cy.get('[style*="background-color: rgb(168, 107, 230)"]').click()

   cy.wait(1000)
  cy.get('[title="Fila 3, Columna 7"]').click()
  cy.get('[title="Fila 3, Columna 8"]').click()
  cy.get('[title="Fila 3, Columna 9"]').click()
  cy.get('[title="Fila 3, Columna 10"]').click()
 

  cy.wait(1000) 
  cy.get('.w-full > span').click()
cy.wait(1000)
  
cy.get('.group > .font-inherit').click()
cy.get(':nth-child(4) > :nth-child(1) > .z-0').click()

  })



    it('Mas de 4 entradas', () => {
    cy.visit('https://ticketazo.com.ar/auth/login')

    const email = 'lizgiraldo@utp.edu.co'
    const password = 'Ticketazo4$%&.liz'

    cy.loginclientcompra(email, password)


   cy.get('[style*="background-color: rgb(168, 107, 230)"]').click()

   cy.wait(1000)
  cy.get('[title="Fila 3, Columna 7"]').click()
  cy.get('[title="Fila 3, Columna 8"]').click()
  cy.get('[title="Fila 3, Columna 9"]').click()
  cy.get('[title="Fila 3, Columna 10"]').click()
  cy.get('[title="Fila 3, Columna 11"]').click()
 
  cy.contains('No puedes seleccionar más de 4 asientos por persona').should('be.visible')
  
  })
})