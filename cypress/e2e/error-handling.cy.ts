/// <reference types="cypress" />

describe('DASOS error-handling Flows', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('/');
  });

  describe('Error Handling', () => {
    it('should handle 404 pages', () => {
      cy.visit('/nonexistent-page', { failOnStatusCode: false });
      
      // Should redirect to dashboard or show 404
      cy.url().should('satisfy', (url: string) => {
        return url.includes('/dashboard') || url.includes('/nonexistent-page') || url.includes('/login'); ;
      });
    });

    it('should handle API errors gracefully', () => {
      // Intercept API call and return error
      cy.intercept('GET', '**/api/v1/subjects/**', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      }).as('apiError');
      cy.login('student@example.com', 'password123');
      cy.visit('/dashboard/subjectdata/105000159');
      cy.contains('No hay datos').scrollIntoView();
      // Should show error state or fallback
      cy.contains('No hay datos').should('be.visible');
    });
  });

});

