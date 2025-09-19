import RegistroPage from './RegistroPage';
const registroPage = new RegistroPage();
class FiltroPage {
imputBuscar= '[aria-label="Search"]';




// método para buscar evento y siempre borrar lo que hay en el campo 

buscarEvento(evento) {
  if (evento) {
    cy.get(this.imputBuscar)
      .click()
      .clear()     
      .type(evento);
  }
}

// Obtener el campo de Eventos cercanos 
get checkboxEventosCercanos() {
  return cy.get('#locationFilter');
}

// Obtener el campo limpiar filtros
get limpiarFiltrosBtn() {
  return cy.get('button[type="button"]').contains('Limpiar filtros');
}


// Método para validar que el checkbox no esta marcado
verificarCheckboxNoMarcado() {
  this.checkboxEventosCercanos.should('not.be.checked');
}



// Método para marcar el checkbox
marcarCheckbox() {
  this.checkboxEventosCercanos.check({ force: true }).should('be.checked');
}



// Método para verificar que SÍ está marcado
verificarCheckboxMarcado() {
  this.checkboxEventosCercanos.should('be.checked');
}



// Método para dar clic en el botón de limpiar filtros
clickLimpiarFiltros() {
  this.limpiarFiltrosBtn.click();
}

verificarProvinciaReseteada() {
  cy.get('button[aria-label="Provincia"] [data-slot="value"]')
    .should('have.text', 'Provincia');
}

//Método para aplicar filtros de categoría, provincia, localidad y eventos cercanos

aplicarFiltros(categoria, provincia, localidad) {
    this.selectCategoria(categoria);
    this.marcarCheckbox();
    registroPage.seleccionarProvincia(provincia);
    registroPage.seleccionarLocalidad(localidad);
  }

  // Método para las categorias para  el desplegable
 openDropdown() {
    cy.get('button[aria-label="Categoría"]').click({ force: true });
  }

// Método para seleccionar varias categorías 
  selectMultiple(categories) {
    this.openDropdown();
    cy.get('[role="listbox"]').should('be.visible');
    categories.forEach(cat => {
      cy.contains('[role="option"]', cat).click({ force: true });
    });
  }


  // Método para seleccionar solo una categoría 
  selectCategoria(categoria) {
    this.openDropdown();
    cy.get('[role="listbox"]').should('be.visible');
      cy.contains('[role="option"]', categoria).click({ force: true });
    };
  
    
// Verificar que el campo queda con el valor categoría una vez se limpian los datos
verifiCategoriaLimpia() {
  cy.get('button[aria-label="Categoría"] span[data-slot="value"]')
    .should('have.text', 'Categoría'); 
}
  

    // se verifica la categoría seleccionada 
    verifiCategoriaSelected(categoria) {
  cy.get('button[aria-label="Categoría"]')
    .invoke('attr', 'value')
    .should('include', categoria);
}

   // se verifica las categorías seleccionadas 
  verifiCategoriesSelected(categories) {
    cy.get('button[aria-label="Categoría"]')
      .invoke('attr', 'value')
      .then(value => {
        categories.forEach(cat => {
          expect(value).to.include(cat);
        });
      });
  }

// se verifica las categorías  no seleccionadas 
  
  verifiCategoriesNotSelected(categories) {
  cy.get('button[aria-label="Categoría"]')
    .invoke('attr', 'value')
    .should(value => {
      categories.forEach(cat => {
        expect(value).not.to.include(cat);
      });
    });
  }
}


export default FiltroPage;