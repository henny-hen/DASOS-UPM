/// <reference types="cypress" />

// Make this file a module to allow global augmentation
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login
       * @example cy.login('user@example.com', 'password')
       */
      login(email: string, password: string): Chainable<void>


      
      /**
       * Custom command to wait for page load
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>
      
      /**
       * Custom command to test responsive design
       * @example cy.testResponsive()
       */
      testResponsive(): Chainable<void>
    /**
     * Custom command to simulate tab key navigation
     * @example cy.tab()
     */
    tab(): Chainable<void>;
    }
  }
}

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// Tab navigation helper
Cypress.Commands.add('tab', () => {
  cy.focused().tab();
});


Cypress.Commands.add('injectAxe', () => {
  cy.window({ log: false }).then(window => {
    // Inject axe-core for accessibility testing
    // Requires cypress-axe to be installed
  });
});

Cypress.Commands.add('checkA11y', (context?, options?) => {
  cy.checkA11y(context, {
    ...options,
    rules: {
      // Customize rules based on your needs
      'color-contrast': { enabled: true },
      'heading-order': { enabled: true },
      'landmark-one-main': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true },
      ...options?.rules
    }
  }, (violations) => {
    // Custom violation handling
    if (violations.length) {
      const violationData = violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      }));
      
      cy.task('log', 'Accessibility violations:');
      cy.task('table', violationData);
    }
  });
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// Custom commands