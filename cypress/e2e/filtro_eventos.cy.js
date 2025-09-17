import FiltroPage from '../support/FiltroPage';

describe('Pruebas filtros de eventos', () => {
  const filtroPage = new FiltroPage();
  

  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/'); // URL donde se ven los eventos sin estar logueado
    cy.viewport(1280, 720); // Forzar pantalla grande
  });

 // Verificar que el usuario pueda filtrar por el nombre del evento
 const eventos = ["El Eternauta", "Los Piojos en River"]

  it('Filtrar evento por nombre, sin estar logueado', () => {

 // Se intercepta el endpoint que trae los eventos
  cy.intercept('GET', '**/api/backend/events').as('getEventos')
 
  eventos.forEach(evento => {
    // Buscar en la UI
    filtroPage.buscarEvento(evento)

    // Validar que aparezca en la interfaz
    cy.contains(evento).should('be.visible')

    // Validar que la API devuelva ese evento
    cy.wait('@getEventos').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)

      const listaEventos = interception.response.body

      const existeEvento = listaEventos.some(e =>
        e.titulo && e.titulo.toLowerCase().includes(evento.toLowerCase())
      )

      expect(existeEvento).to.be.true
    })
  })
})

// Verificar que se puedan seleccionar varias categorías

it('Seleccionar y deseleccionar varias categorías', () => {
   const categorias = ['Recital', 'Teatro', 'StandUp', 'Conferencia'];
  filtroPage.selectMultiple(categorias);
  filtroPage.verifiCategoriesSelected(categorias);
  // Ahora deseleccionamos "Recital"
  filtroPage.openDropdown();
  cy.contains('[role="option"]', 'Recital').click({ force: true });
  filtroPage.verifiCategoriesNotSelected(['Recital']);
});


// verificar que se puedan limpiar los filtros 
it('Limpiar filtros realizados, sin estar logueado', () => {

   const categoria = 'Recital'
   const provincia = 'Córdoba'
  const localidad= 'Córdoba'
  filtroPage.aplicarFiltros(categoria, provincia, localidad)
  filtroPage.clickLimpiarFiltros()
  filtroPage.verificarCheckboxNoMarcado()
  filtroPage.verificarProvinciaReseteada()
  filtroPage.verifiCategoriaLimpia()


  
});


 });

  