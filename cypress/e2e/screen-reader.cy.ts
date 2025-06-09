/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Screen-reader accesibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');

  });


  describe('Screen Reader Support', () => {

    it('should announce live regions properly', () => {
      // Check for ARIA live regions
      cy.get('[aria-live]').should('exist');
      
      // Trigger an error to test alert announcement
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      
      cy.get('input[type="email"]')
        .should('be.visible')
        .and('have.attr', 'aria-live', 'polite');
    });

        it('should have proper heading hierarchy', () => {
      cy.login('student@example.com', 'password123');
      
      // Check h1 exists and is unique
      cy.get('h1').should('have.length', 1);
      
      // Check heading order
      let lastLevel = 0;
      cy.get('h1, h2, h3, h4, h5, h6').each(($heading) => {
        const level = parseInt($heading.prop('tagName').charAt(1));
        expect(level).to.be.at.most(lastLevel + 1);
        lastLevel = level;
      });  
    });


  });



  

});

// Custom command implementations


