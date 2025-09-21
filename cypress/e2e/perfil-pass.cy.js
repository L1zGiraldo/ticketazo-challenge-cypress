describe('HappyPath: Perfil > Actualizar contraseña',() => {
    let perfilData
    let estadoAlternado

    before(() => {
      // Cargo los datos del archivo JSON solo una vez al inicio
        cy.fixture('datos-perfil').then(data => {
        perfilData = data;
      });

      // Leo el estado actual de la contraseña
      cy.fixture('estado_alternado').then(data => {
        estadoAlternado = data;
      });

    });


    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/login');
        cy.get('[data-cy="input-email"]').type(perfilData.usuarioValido.email);
        cy.get('[data-cy="input-password"]').type(estadoAlternado.password_actual);
        cy.get('[data-cy="btn-login"]').click();
        cy.wait(100);
    });

   it('TC-Perfil-01 - Actualizar contraseña correctamente', () => {

    // Intercepto el evento del alert antes de la acción que lo dispara para validarlo
        cy.on('window:alert', (textoDelAlert) => {
        expect(textoDelAlert).to.equal('Contraseña actualizada correctamente');
        });

    // Navego al perfil después del login
    cy.get('.w-6.h-6.text-default-600').click()
    cy.get(':nth-child(2) > .pb-4').click()
    cy.wait(500); 
    cy.get('[data-cy="btn-editar-password"]').click()

    // Relleno los campos del formulario de cambio de contraseña
    cy.get('[data-cy="input-password-actual"]').type(estadoAlternado.password_actual)
    cy.get('[data-cy="input-password-nueva"]').type(estadoAlternado.password_reserva)
    cy.wait(500); 
    cy.get('[data-cy="btn-guardar-password"]').click()

        // Si el alert es verificado:
        cy.then(() => {
            // Intercambio los valores para la próxima ejecución
            const nuevaContrasena = estadoAlternado.password_reserva;
            const contrasenaAnterior = estadoAlternado.password_actual;

            // Actualizo el JSON con la nueva contraseña como actual
            cy.writeFile('cypress/fixtures/estado_alternado.json', {
                password_actual: nuevaContrasena,
                password_reserva: contrasenaAnterior
            });
          });
        });
    })

describe('Pruebas con datos incorrectos', () => {
  let perfilData2


    before(() => {
        cy.fixture('datos-perfil').then(data => {
        perfilData2 = data;
        });
    });

  it('TC-Perfil-02 - Alert al actualizar con contraseña actual incorrecta', () => {

        // ooIntercepto el evento de alerta
        // Intercepto el evento de alerta
        const stub = cy.stub()
        cy.on('window:alert', stub)

        // Ejecuto las acciones que causan el alert
        cy.visit('https://ticketazo.com.ar/auth/login')
        cy.get('[data-cy="input-email"]').type(perfilData2.pruebasPass.mailAlternativo)
        cy.get('[data-cy="input-password"]').type(perfilData2.pruebasPass.passCorrectaAlternativa)
        cy.get('[data-cy="btn-login"]').click()
        cy.wait(100)

        cy.get('.w-6.h-6.text-default-600').click()
        cy.get(':nth-child(2) > .pb-4').click()
        cy.wait(500)
        cy.get('[data-cy="btn-editar-password"]').click()

        // Relleno con contraseña actual incorrecta
        cy.get('[data-cy="input-password-actual"]').type(perfilData2.pruebasPass.passIncorrecta)
        cy.get('[data-cy="input-password-nueva"]').type(perfilData2.pruebasPass.passIncorrecta2)
        cy.wait(500)
        cy.get('[data-cy="btn-guardar-password"]').click()

        cy.wrap(stub).should('have.been.calledOnceWith', 'Contraseña actual incorrecta');
  });

  it('TC-Perfil-03 - alert al intentar avanzar sin completar los campos', () => {

        // Intercepto el evento de alerta
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.visit('https://ticketazo.com.ar/auth/login')
        cy.get('[data-cy="input-email"]').type(perfilData2.pruebasPass.mailAlternativo)
        cy.get('[data-cy="input-password"]').type(perfilData2.pruebasPass.passCorrectaAlternativa)
        cy.get('[data-cy="btn-login"]').click()
        cy.wait(100)

        cy.get('.w-6.h-6.text-default-600').click()
        cy.get(':nth-child(2) > .pb-4').click()
        cy.wait(500)
        cy.get('[data-cy="btn-editar-password"]').click()

        // cy.get('[data-cy="input-password-actual"]').type(perfilData2.pruebasPass.passVacia)
        // cy.get('[data-cy="input-password-nueva"]').type(perfilData2.pruebasPass.passVacia)
        cy.get('[data-cy="btn-guardar-password"]').click()
        cy.wait(100)

        cy.wrap(stub).should('have.been.calledOnceWith', 'Contraseña actual y nueva son requeridas');
  });

    it('TC-Perfil-04 - Alert si la nueva contraseña no cumple con criterios', () => {

        // Intercepto el evento de alerta
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.visit('https://ticketazo.com.ar/auth/login')
        cy.get('[data-cy="input-email"]').type(perfilData2.pruebasPass.mailAlternativo)
        cy.get('[data-cy="input-password"]').type(perfilData2.pruebasPass.passCorrectaAlternativa)
        cy.get('[data-cy="btn-login"]').click()
        cy.wait(100)

        cy.get('.w-6.h-6.text-default-600').click()
        cy.get(':nth-child(2) > .pb-4').click()
        cy.wait(500)
        cy.get('[data-cy="btn-editar-password"]').click()

        cy.get('[data-cy="input-password-actual"]').type(perfilData2.pruebasPass.passCorrectaAlternativa)
        cy.get('[data-cy="input-password-nueva"]').type(perfilData2.pruebasPass.passMal)
        cy.wait(500)
        cy.get('[data-cy="btn-guardar-password"]').click()

        cy.wrap(stub).should('have.been.calledOnceWith', 'La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
  });

  it('TC-Perfil-05 - Verificar que se cumplan los requisitos de creación de contraseña', () => {

        // Intercepto el evento de alerta
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.visit('https://ticketazo.com.ar/auth/login')
        cy.get('[data-cy="input-email"]').type(perfilData2.pruebasPass.mailAlternativo)
        cy.get('[data-cy="input-password"]').type(perfilData2.pruebasPass.passCorrectaAlternativa)
        cy.get('[data-cy="btn-login"]').click()
        cy.wait(100)

        cy.get('.w-6.h-6.text-default-600').click()
        cy.get(':nth-child(2) > .pb-4').click()
        cy.wait(500)
        cy.get('[data-cy="btn-editar-password"]').click()

        cy.get('[data-cy="input-password-actual"]').type(perfilData2.pruebasPass.passCorrectaAlternativa)
        cy.get('[data-cy="input-password-nueva"]').type(perfilData2.pruebasPass.passBug)
        cy.wait(500)
        cy.get('[data-cy="btn-guardar-password"]').click()

        cy.wrap(stub).should('have.been.calledOnceWith', 'Contraseña actualizada correctamente');
  });



})