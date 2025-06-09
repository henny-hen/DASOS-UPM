// ***********************************************************
// This file is processed and loaded automatically before your test files.
// You can change the location of this file or turn off processing
// cypress/support/e2e.ts
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'

// Import testing library commands
import '@testing-library/cypress/add-commands'

// Import accessibility testing
import 'cypress-axe'

// Alternatively you can use CommonJS syntax:
// require('./commands')


// Hide fetch/XHR requests from command log
const app = window.top;

if (app && app.document && app.document.head && !app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Global before each hook
beforeEach(() => {
  // Set viewport
  cy.viewport(1280, 720);
  
  // Clear cookies and local storage
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Set up interceptors for common API calls
  cy.intercept('GET', '**/api/v1/subjects', { fixture: 'subjects.json' }).as('getSubjects');
  cy.intercept('GET', '**/api/v1/stats', { fixture: 'stats.json' }).as('getStats');
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing tests on uncaught exceptions
  // Log the error for debugging
  console.error('Uncaught exception:', err);
  
  // Return false to prevent the error from failing the test
  // You might want to be more selective here based on the error
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  
  // Let other errors fail the test
  return true;
});

// Add custom types
