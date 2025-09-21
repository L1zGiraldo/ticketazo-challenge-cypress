
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

export function llenadoForm2 (data) {
    cy.contains('button', data.nombreEntrada0).should('be.visible').click();
    selectPorLabel('Nombre de la entrada',data.nombreEntrada0 || '')
    // Primera entrada
    //cy.get('input[name="capacidadEntrada0"]').clear().type('22')
    cy.get('input[name="precioEntrada0"]').type(data.precioEntrada0)
    cy.contains('button', 'Agregar Entrada').should('be.visible').click();
    //Segunda entrada
    cy.contains('button', data.nombreEntrada1).should('be.visible').click();
    cy.get(`button:has(> label:contains("Nombre de la entrada"))`).eq(1).click()
    cy.contains('[role="option"]', data.nombreEntrada1).click({ force: true });
    //cy.get('input[name="capacidadEntrada1"]').type('{selectAll}{backspace}').type('38')
    cy.get('input[name="precioEntrada1"]').type(data.precioEntrada1)    
};

export function cargaEvento (data) {
    cy.get('[data-cy="input-titulo"]').type(data.titulo);
    cy.get('[data-cy="datepicker-fecha"] [data-type="day"]').type(data.dia);
    cy.get('[data-cy="datepicker-fecha"] [data-type="month"]').type(data.mes);
    cy.get('[data-cy="datepicker-fecha"] [data-type="year"]').type(data.anio);
    seleccionarOpcion("select-edad",data.edad);
    seleccionarOpcion("select-genero",data.genero);
    cy.get('[data-cy="input-horario"] [data-type="hour"]').type(data.horarioHora);
    cy.get('[data-cy="input-horario"] [data-type="minute"]').type(data.horarioMin);
    cy.get('[data-cy="input-duracion"] [data-type="hour"]').type(data.duracionEventoHora);
    cy.get('[data-cy="input-duracion"] [data-type="minute"]').type(data.duracionEventoMin);
    seleccionarOpcion("select-lugar-evento", data.lugarEvento2);
    cy.wait(1000);
    
    //Datos del lugar
     cy.get('[data-cy="input-nombre-lugar"]').type(data.nombreLugar);
     cy.get('[data-cy="input-calle-lugar"]').type(data.calle);
     cy.get('[data-cy="input-altura-lugar"]').type(data.altura);
     cy.get('[data-cy="input-codigo-postal-lugar"]').type(data.codigoPostal);

     cy.get('[aria-label="Provincia"]').should('be.visible').click();
     cy.get('[aria-label="Provincia"]').type(data.provincia);
     cy.get('[aria-label="Localidad"]').should('be.visible').click();
     cy.get('[aria-label="Localidad"]').type(data.localidad);
     cy.get('[data-cy="input-info"]').type( data.descripcionEvento);

};

export function cargaEntrada (data) {
    selectPorLabel('Nombre de la entrada', data.nombreEntrada1);
     cy.get('[aria-label="Capacidad"]').click();
     cy.get('[aria-label="Capacidad"]').type(data.capacidad2);
     cy.get('[aria-label="Precio Entrada"]').click();
     cy.get('[aria-label="Precio Entrada"]').type(data.precioEntrada1);    
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


