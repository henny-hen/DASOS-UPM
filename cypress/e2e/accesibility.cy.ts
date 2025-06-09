/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Accessibility Tests', () => {
  beforeEach(() => {
    // Inject axe-core for accessibility testing
    cy.visit('/');
    cy.injectAxe();
  });

  describe('WCAG 2.1 Level AA Compliance', () => {
    it('should meet accessibility standards on login page', () => {
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      });
    });

    it('should meet accessibility standards on dashboard', () => {
      cy.login('student@example.com', 'password123');
      cy.injectAxe();
      
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      });
    });

    it('should meet accessibility standards on subject details', () => {
      cy.login('student@example.com', 'password123');
      cy.visit('/dashboard/subjectdata/105000005');
      cy.injectAxe();
      
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      });
    });
  });


});

// Custom command implementations


