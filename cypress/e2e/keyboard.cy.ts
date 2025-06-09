/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Keyboard Accessibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');

  });


  describe('Keyboard Navigation', () => {


    it('should have proper focus indicators', () => {
      cy.get('input[type="email"]').focus();
      cy.focused().should('have.css', 'outline-style').and('not.eq', 'none');
      
      cy.get('input[type="password"]').focus();
      cy.focused().should('have.css', 'outline-style').and('not.eq', 'none');
    });


    it('should support keyboard shortcuts', () => {
      cy.login('student@example.com', 'password123');
      
      // Press / to focus search
      cy.get('body').type('{ctrl+k}');
      cy.focused().should('have.attr', 'placeholder').and('include', 'Busca');
      
      // Escape to unfocus
      cy.focused().type('{esc}');
      cy.get('[role="listbox"]').should('not.exist');
    });
  });

});

// Custom command implementations


