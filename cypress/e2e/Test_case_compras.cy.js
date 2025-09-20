describe('Test_compras', () => {
  
  it('Happy path Compras', () => {
    cy.visit('https://ticketazo.com.ar/auth/login')

    const email = 'lizgiraldo@utp.edu.co'
    const password = 'Ticketazo4$%&.liz'

    cy.loginclientcompra(email, password)

   cy.wait(1000) 
   cy.get('[data-cy="btn-ver-evento-8"]').click()


   cy.contains('button', 'Adquirir entrada')
   .scrollIntoView()
   .click({ force: true })

   cy.contains('button', 'Auditorio').click()

   cy.wait(1000)
   cy.get('[title="Fila 19, Columna 1"]').click()

   cy.get('.w-full > span').click()

   cy.get('.mt-6 > .z-0').click()

   cy.get('.justify-end > .z-0').click()

   cy.contains('a', 'Mis entradas').click()
   


  })
  
  
  
  
  it('Cancelado antes del pago', () => {
    cy.visit('https://ticketazo.com.ar/auth/login')

    const email = 'lizgiraldo@utp.edu.co'
    const password = 'Ticketazo4$%&.liz'

    cy.loginclientcompra(email, password)

    cy.wait(1000) 
    cy.get('[data-cy="btn-ver-evento-1"]').click()


   cy.contains('button', 'Adquirir entrada')
   .scrollIntoView()
   .click({ force: true })


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


  })



  it('Mas de 4 entradas', () => {
    cy.visit('https://ticketazo.com.ar/auth/login')

    const email = 'lizgiraldo@utp.edu.co'
    const password = 'Ticketazo4$%&.liz'

    cy.loginclientcompra(email, password)

    cy.wait(1000) 
    cy.get('[data-cy="btn-ver-evento-1"]').click()


    cy.contains('button', 'Adquirir entrada')
    .scrollIntoView()
    .click({ force: true })


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