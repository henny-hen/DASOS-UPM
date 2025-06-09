/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Media accesibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');

  });


  describe('Media Accessibility', () => {
    it('should have alt text for images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });
    });

    it('should have accessible charts', () => {
      cy.login('student@example.com', 'password123');
      cy.visit('/dashboard/subjectdata/105000005');
      
      // Charts should have accessible descriptions
      cy.get('canvas').each(($canvas) => {
        cy.wrap($canvas).should('have.attr', 'role', 'img');
        cy.wrap($canvas).should('have.attr', 'aria-label');
      });
    });
  });



});

// Custom command implementations


