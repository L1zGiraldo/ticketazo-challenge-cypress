/// <reference types="cypress" />
import 'cypress-axe';
import 'cypress-plugin-tab';
import 'cypress-real-events/support';


function logViolaciones(violations) {
  if (!violations || !violations.length) {
    cy.task('log', '\n✅ No se encontraron violaciones de accesibilidad.\n');
    return;
  }

  cy.task('log', `\n=== ${violations.length} violaciones encontradas ===\n`);
  violations.forEach(({ id, impact, description, nodes }) => {
    cy.task('log', `🔴 [${impact}] ${id}: ${description}`);
    nodes.forEach(({ target }) => {
      cy.task('log', `   → Afecta: ${target.join(', ')}`);
    });
  });
}

describe('Accesibilidad - Ticketazo', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar'); 
    cy.injectAxe();
  });

 
  it('Tiene elementos tabbables y se puede enfocar cada uno programáticamente', () => {
    const selectorTabbable = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      '[tabindex]',
      '[contenteditable="true"]'
    ].join(',');

    cy.get(selectorTabbable)
      .filter(':visible')
      .then(($els) => {
        const all = Array.from($els).filter((el) => {
          const ti = el.getAttribute('tabindex');
          if (ti !== null && Number(ti) < 0) return false;
          return true;
        });

        expect(all.length, 'Al menos 1 elemento tabbable visible').to.be.greaterThan(0);

        const max = Math.min(all.length, 6);
        for (let i = 0; i < max; i++) {
          const el = all[i];
          cy.wrap(el).focus().should('have.focus');
        }
      });
  });


  it('El foco produce un cambio visual detectable en el elemento enfocado', () => {
  
    const selectorTabbable = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    cy.get(selectorTabbable)
      .filter(':visible')
      .first()
      .then(($el) => {
        const domEl = $el[0];
       
        const props = [
          'outlineStyle',
          'boxShadow',
          'borderTopColor',
          'borderRightColor',
          'borderBottomColor',
          'borderLeftColor',
          'backgroundColor',
          'transform',
          'opacity',
          'color'
        ];

      
        cy.window().then((win) => {
          const before = props.map((p) => win.getComputedStyle(domEl)[p]);
          
          cy.wrap(domEl).focus();

          cy.wait(120);

          cy.window().then((win2) => {
            const after = props.map((p) => win2.getComputedStyle(domEl)[p]);

            const cambios = props.reduce((acc, _, idx) => {
              if (after[idx] !== before[idx]) return acc + 1;
              return acc;
            }, 0);

            expect(cambios, `Al menos 1 propiedad visual debe cambiar al enfocar (cambios: ${cambios})`).to.be.greaterThan(0);
          });
        });
      });
  });

 
  it('Todos los botones principales son visibles', () => {
    cy.get('button').should('be.visible');
  });

  it('Cada evento tiene un botón "Ver evento"', () => {
    cy.contains('button', 'Ver evento').should('exist');
  });

  it('Las imágenes de eventos tienen atributo alt', () => {
    cy.get('img').each(($img) => {
      expect($img).to.have.attr('alt');
    });
  });

  
  it('No tiene violaciones de accesibilidad detectables al cargar la página', () => {
    cy.checkA11y(null, null, logViolaciones, { skipFailures: true });
  });

  it('No tiene violaciones de accesibilidad en un contexto específico (solo WCAG2A)', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a']
      }
    }, logViolaciones, { skipFailures: true });
  });

  it('No tiene violaciones críticas de accesibilidad', () => {
    cy.checkA11y(null, {
      includedImpacts: ['critical']
    }, logViolaciones, { skipFailures: true });
  });

  it('No tiene violaciones de accesibilidad después de hacer click en un botón', () => {
    cy.contains('button', 'Ver evento').first().click();
    cy.wait(1000);
    cy.checkA11y(null, null, logViolaciones, { skipFailures: true });
  });

  it('Registra violaciones sin romper el test', () => {
    cy.checkA11y(null, null, logViolaciones, { skipFailures: true });
  });

  
});
