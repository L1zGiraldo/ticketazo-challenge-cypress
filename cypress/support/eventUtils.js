
export function llenadoForm1 (data) {
    cy.get('[data-cy="input-titulo"]').type(data.titulo || '')
    cy.get('[data-cy="datepicker-fecha"] [data-type="day"]').type(data.dia || '');
    cy.get('[data-cy="datepicker-fecha"] [data-type="month"]').type(data.mes || '');
    cy.get('[data-cy="datepicker-fecha"] [data-type="year"]').type(data.anio || '');
    seleccionarOpcion("select-edad",data.edad || '')
    seleccionarOpcion("select-genero",data.genero || '')
    cy.get('[data-cy="input-horario"] [data-type="hour"]').type(data.horarioHora || '')
    cy.get('[data-cy="input-horario"] [data-type="minute"]').type(data.horarioMin || '')
    cy.get('[data-cy="input-duracion"] [data-type="hour"]').type(data.duracionEventoHora || '')
    cy.get('[data-cy="input-duracion"] [data-type="minute"]').type(data.duracionEventoMin || '')
    seleccionarOpcion("select-lugar-evento",data.lugarEvento || '')
    cy.wait(1000)
    selectPorLabel("Sala", data.sala || '')
    cy.get('[data-cy="input-info"]').type(data.descripcionEvento || '')
    
};


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