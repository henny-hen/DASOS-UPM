/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Color accesibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');
    cy.injectAxe();

  });


  describe('Color Contrast', () => {
    it('should have sufficient color contrast ratios', () => {
      // This is checked by axe-core, but we can add specific tests
      cy.checkA11y(null, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });
    });

    it('should not rely solely on color', () => {
      cy.login('student@example.com', 'password123');
      
      // Check that error states have icons or text, not just color
      cy.visit('/dashboard/subjectdata/105000005');
      
      // Performance indicators should have text labels
      cy.contains('Tasa de rendimiento').should('be.visible');
      cy.get('[class*="text-green"]').parent().should('not.contain.text');
      cy.get('[class*="text-red"]').parent().should('not.contain.text');
    });
  });



});

// Custom command implementations


