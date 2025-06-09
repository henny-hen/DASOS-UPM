/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Forms accesibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');

  });


  describe('Form Accessibility', () => {


    it('should have proper ARIA labels', () => {
      // Check form inputs have labels
      cy.get('input[type="email"]').should('have.attr', 'aria-label');
      cy.get('input[type="password"]').should('have.attr', 'aria-label');
      
      // Check buttons have accessible names
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('satisfy', ($el) => {
          const text = $el.text().trim();
          const ariaLabel = $el.attr('aria-label');
          return text.length > 0 || ariaLabel?.length > 0;
        });
      });
    });

    it('should have accessible form controls', () => {
      // Check all form inputs have labels
      cy.get('input').each(($input) => {
        cy.wrap($input).should('satisfy', ($el: JQuery<HTMLElement>) => {
          const id = $el.attr('id');
          const ariaLabel = $el.attr('aria-label');
          const ariaLabelledby = $el.attr('aria-labelledby');
          
          // Either has aria-label, aria-labelledby, or associated label
          return ariaLabel || ariaLabelledby || (id && Cypress.$(`label[for="${id}"]`).length > 0);
        });
      });
    });

    it('should have proper form field grouping', () => {
      cy.login('student@example.com', 'password123');
      cy.visit('/dashboard/settings');
      
      // Check fieldsets have legends
      cy.get('fieldset').each(($fieldset) => {
        cy.wrap($fieldset).find('legend').should('exist');
      });
    });

        it('should show form validation errors accessibly', () => {
        cy.get('input[type="email"]').focus().blur();
        
        // Check for error message association
        cy.get('input[type="email"]').then(($input) => {
        const ariaDescribedby = $input.attr('aria-describedby');
        if (ariaDescribedby) {
            cy.get(`#${ariaDescribedby}`).should('exist');
        }
        });
    });
  });

});

// Custom command implementations


