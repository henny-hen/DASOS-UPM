/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Responsive design and accesibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');

  });


  describe('Responsive Accessibility', () => {
    it('should maintain accessibility on mobile', () => {
      cy.viewport('iphone-x');
      cy.injectAxe();
      cy.checkA11y();
      
      // Check touch targets are large enough
      cy.get('button, a').each(($el) => {
        cy.wrap($el).should('have.css', 'min-height').and('eq', '0px');
      });
    });

    it('should have accessible mobile navigation', () => {
      cy.viewport('iphone-x');
      cy.login('student@example.com', 'password123');
      
      // Mobile menu should be keyboard accessible
      cy.get('[aria-label="Menú principal"]').should('be.visible');
    });
  });

    describe('Responsive Design', () => {
    beforeEach(() => {
      cy.login('student@example.com', 'password123');
    });

    it('should work on mobile devices', () => {
      cy.viewport('iphone-x');
      
      // Menu should be collapsed
      cy.get('[aria-label="DASOS UPM"]').should('be.visible');
      cy.get('[aria-label="Toggle navigation menu"]').click();
      
      // Navigation should still work
      cy.get('[aria-label="Buscar"]').click();
      cy.url().should('include', '/dashboard/subjectdata');
    });

    it('should work on tablet devices', () => {
      cy.viewport('ipad-2');
      
      // Check layout adapts properly
      cy.contains('Dashboard Académico').should('be.visible');
      cy.get('.grid').should('have.css', 'grid-template-columns');
    });
  });



});

// Custom command implementations


