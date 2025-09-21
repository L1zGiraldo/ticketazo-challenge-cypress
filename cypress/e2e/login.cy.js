describe('Login - Ticketazo', () => {
  let loginData

  before(() => {
    // Cargamos datos desde fixture
    cy.fixture('datos_login').then((data) => {
      loginData = data
    })
  })

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login')
  })

  it('TC-LOGIN-01 - Acceso válido', () => {
    cy.get('[data-cy="input-email"]').type(loginData.validUser.email)
    cy.get('[data-cy="input-password"]').type(loginData.validUser.password)
    cy.get('[data-cy="btn-login"]').click()
    cy.contains('button', 'Ver evento').should('be.visible')
    cy.wait(2000); 

  })

  it('TC-LOGIN-02 - Acceso inválido', () => {
    cy.get('[data-cy="input-email"]').type(loginData.invalidUser.email)
    cy.get('[data-cy="input-password"]').type(loginData.invalidUser.password)
    cy.get('[data-cy="btn-login"]').click()

    cy.url().should('include', '/auth/login')
    cy.contains(/Correo o contraseña incorrectos/i).should('be.visible')
  })

  it('TC-LOGIN-03 - Campo vacío', () => {
    cy.get('[data-cy="input-email"]').type(loginData.validUser.email)
    cy.get('[data-cy="btn-login"]').click()
    cy.contains(/Correo o contraseña incorrectos/i).should('be.visible')
  })

  it('TC-LOGIN-04 - Email con formato inválido', () => {
    cy.get('[data-cy="input-email"]').type('adminadmin.com')
    cy.get('[data-cy="input-password"]').type(loginData.validUser.password)
    cy.get('[data-cy="btn-login"]').click()
    cy.contains(/Incluye un signo "@" en la dirección de correo electrónico/i).should('be.visible')
  })

  it('TC-LOGIN-05 - Persistencia de sesión', () => {
    cy.get('[data-cy="input-email"]').type(loginData.validUser.email)
    cy.get('[data-cy="input-password"]').type(loginData.validUser.password)
    cy.get('[data-cy="btn-login"]').click()
    cy.contains('button', 'Ver evento').should('be.visible')
    cy.wait(2000); 
    cy.reload()
    cy.contains('button', 'Ver evento').should('be.visible')
  })

  it('TC-LOGIN-06 - Cierre de sesión', () => {
    cy.viewport(1280, 720)
    cy.get('[data-cy="input-email"]').type(loginData.validUser.email)
    cy.get('[data-cy="input-password"]').type(loginData.validUser.password)
    cy.get('[data-cy="btn-login"]').click()
    cy.contains('button', 'Ver evento').should('be.visible')
    cy.wait(2000); 
    cy.contains('button', 'Logout').should('be.visible')
    cy.get('.text-medium > .z-0').click()
    cy.contains('button', 'Login').should('be.visible')
  })
})
