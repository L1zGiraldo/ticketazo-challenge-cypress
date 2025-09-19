import datosValidos from '../fixtures/datos_validos_evento.json';
import datosInvalidos from '../fixtures/datos_invalidos_evento.json';
import { llenadoForm1 } from '../support/eventUtils';

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

})


describe('Carga de Nuevo Evento', () => {
  

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login');
    
     cy.get('[data-cy="input-email"]').type('teatroglobal@yopmail.com');
     cy.get('[data-cy="input-password"]').type('Contra+123');
     cy.get('[data-cy="btn-login"]').click()
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
    
    cy.url().should('include', '/newEvent');
  });

  // Happy path
  it('Carga de nuevo evento con éxito', () => {

    //inicio llenadoForm1
     cy.get('[data-cy="input-titulo"]').type(data.titulo || '')
     cy.get('[data-cy="datepicker-fecha"] [data-type="day"]').type(data.dia || '');
     cy.get('[data-cy="datepicker-fecha"] [data-type="month"]').type(data.mes || '');
     cy.get('[data-cy="datepicker-fecha"] [data-type="year"]').type(data.anio || '');
     seleccionarOpcion("select-edad",data.edad || '')
     seleccionarOpcion("select-genero", data.genero || '')
     cy.get('[data-cy="input-horario"] [data-type="hour"]').type(data.horarioHora || '')
     cy.get('[data-cy="input-horario"] [data-type="minute"]').type(data.horarioMin || '')
     cy.get('[data-cy="input-duracion"] [data-type="hour"]').type(data.duracionEventoHora || '')
     cy.get('[data-cy="input-duracion"] [data-type="minute"]').type(data.duracionEventoMin || '')
     seleccionarOpcion("select-lugar-evento", data.lugarEvento || '')
     cy.wait(1000)
    
     cy.get('[data-cy="input-nombre-lugar"]').type('Jalisco');
     cy.get('[data-cy="input-calle-lugar"]').type('Gral Paz ');
     cy.get('[data-cy="input-altura-lugar"]').type('620');
     cy.get('[data-cy="input-codigo-postal-lugar"]').type('5000');
     

     cy.get('[aria-label="Provincia"]').click()
     cy.get('[aria-label="Provincia"]').type('Córdoba{enter}');
     cy.get('[aria-label="Provincia"]').eq(0).click(); // Abre el menú
     cy.get('[aria-label="Localidad"]').type('Córdoba{enter}');
     cy.get('[aria-label="Localidad"]').should('have.length', 1).type('Cruz del Eje{enter}');//.click(); // Abre el menú
     cy.get('[aria-label="Localidad"]').type('Córdoba{enter}');
     cy.get('[data-cy="input-info"]').type(data.descripcionEvento || '')
    //fin llenadoForm1

     cy.contains('button', 'Siguiente').click();

     //Carga de entradas
     selectPorLabel('Nombre de la entrada','General' || '')
     cy.get('[aria-label="Capacidad"]').click()
     cy.get('[aria-label="Capacidad"]').type('1200{enter}');
     cy.get('[aria-label="Precio Entrada"]').click()
     cy.get('[aria-label="Precio Entrada"]').type('30000{enter}');
     //cy.contains('button', 'Agregar Entrada').click();

     cy.contains('button', 'Siguiente').click();

     //Carga de imagen
     cy.wait(6000)
     cy.contains('button', 'Cargar Imagen Evento').click();

     cy.contains('button', 'Siguiente').click();

     //Confirmar evento nuevo
     cy.contains('button', 'Confirmar').click();
  });

  const selectPorLabel = (labelText, valor) => {
  // Abrimos el menú buscando el botón que contiene el label con ese texto
  cy.get(`button:has(> label:contains("${labelText}"))`).click();
  // Seleccionamos la opción
  cy.contains('[role="option"]', valor).click({ force: true });
  };

  const seleccionarOpcion = (dataCy, valor) => {
  cy.get(`[data-cy="${dataCy}"]`).click(); // Abre el menú
  // Selecciona la opción por texto visible
  cy.contains('li', valor).click(); 
  };




});