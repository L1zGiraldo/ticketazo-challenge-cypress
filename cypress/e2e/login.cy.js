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
})
