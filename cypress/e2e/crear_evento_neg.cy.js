import datosValidos from '../fixtures/datos_validos_evento.json';
import datosInvalidos from '../fixtures/datos_invalidos_evento.json';
import { llenadoForm1, llenadoForm2, cargaEvento, cargaEntrada } from '../support/eventUtils';

describe('Crear evento ', () => {
  
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login')
    cy.get('[data-cy="input-email"]').type("teatroglobal@yopmail.com")
    cy.get('[data-cy="input-password"]').type("Contra+123")
    cy.get('[data-cy="btn-login"]').click()
    // Esperar redirección 
    cy.url().should('not.include', '/login');
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label="Toggle menu"]').is(':visible')) {
        cy.get('button[aria-label="Toggle menu"]').eq(0).click();
        cy.get(':nth-child(2) > .pb-4').click()
        } else {
        cy.contains('a', 'Cargar Evento').should('be.visible').click();
      }
    });
    // Verificar que estamos en el formulario
    cy.url().should('include', '/newEvent');
  })

  it('Validar mensaje de error al exceder el número de caracteres del campo Título del evento ', () => {
    const copiaDatos = { ...datosValidos };
    copiaDatos.titulo = datosInvalidos.tituloExcedente; 

    llenadoForm1(copiaDatos);

    cy.contains('button', 'Siguiente').should('be.visible').click();
    //validar mensaje de error
    cy.contains('El título debe tener menos de 50 caracteres.').should('be.visible');
  })

  it('Validar mensaje de error al colocar caracteres especiales en el campo Título del evento ', () => {
    const copiaDatos = { ...datosValidos };
    copiaDatos.titulo = datosInvalidos.tituloCaracteresEspeciales; 

    llenadoForm1(copiaDatos);

    cy.contains('button', 'Siguiente').should('be.visible').click();
    //validar mensaje de error
    cy.contains('El título contiene caracteres inválidos.').should('be.visible');
  })

  it('Validar mensaje de error al colocar una fecha menor a 24 horas a partir de la fecha actual', () => {
    const copiaDatos = { ...datosValidos };
    copiaDatos.dia = datosInvalidos.fechaInvalida.dia 
    copiaDatos.mes = datosInvalidos.fechaInvalida.mes
    copiaDatos.anio = datosInvalidos.fechaInvalida.anio

    llenadoForm1(copiaDatos);

    cy.contains('button', 'Siguiente').should('be.visible').click();
    //validar mensaje de error
    cy.contains('La fecha debe ser al menos 24 horas a partir de hoy.').should('be.visible');
  })

  it('LLenado form2', () => {
    
    llenadoForm1(datosValidos);

    cy.contains('button', 'Siguiente').should('be.visible').click();
    //form2
    llenadoForm2(datosValidos)
    cy.contains('button', 'Siguiente').click();
    //form 3
    /*cy.get('input[type="file"][accept="image/*"]').selectFile('cypress/fixtures/concierto400x400.jpg', { force: true });
    cy.get('img[alt="Imagen del evento"]').should('have.attr', 'src').and('not.include', 'image-coming-soon'); // verifica que ya no es la imagen por defecto
    cy.contains('button', 'Siguiente').click();
    */
  })

  // Happy path
  it('Carga de evento con éxito', () => {

     const datosEvento = { ...datosValidos };
     //Carga de datos 
     cargaEvento(datosEvento)

     cy.contains('button', 'Siguiente').click();
    
     //Carga de entradas
     cargaEntrada(datosEvento);

     cy.contains('button', 'Siguiente').click();

     //Carga de imagen
     cy.wait(4000)
     cy.get('input[type="file"][accept="image/*"]').selectFile('cypress/fixtures/concierto400x400.jpg', { force: true });

     cy.contains('button', 'Siguiente').click();

     //Confirmar evento nuevo
     cy.contains('button', 'Confirmar').click();
  });

});
