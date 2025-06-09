/// <reference types="cypress" />

describe('Basic Navigation Tests', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('/');
  });

  it('should redirect to login when not authenticated', () => {
    cy.url().should('include', '/login');
    cy.contains('DASOS UPM').should('be.visible');
  });

  it('should display login form elements', () => {
    // Check form elements
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Iniciar sesión');
    
    // Check placeholders
    cy.get('input[type="email"]').should('have.attr', 'placeholder', 'correo@upm.es');
    cy.get('input[type="password"]').should('have.attr', 'placeholder', '••••••••');
  });

  it('should login successfully with valid credentials', () => {
    // Type credentials
    cy.get('input[type="email"]').type(Cypress.env('testUser').email);
    cy.get('input[type="password"]').type(Cypress.env('testUser').password);
    
    // Submit form
    cy.get('button[type="submit"]').click();
    
    // Wait for navigation
    cy.url().should('include', '/dashboard');
    
    // Verify dashboard elements
    cy.contains('Dashboard Académico').should('be.visible');
    cy.get('[aria-label="Menú principal"]').should('be.visible');
  });

  it('should navigate through main menu items', () => {
    // Login first
    cy.login(Cypress.env('testUser').email, Cypress.env('testUser').password);
    
    // Test navigation to subjects
    cy.get('[aria-label="Buscar"]').click();
    cy.url().should('include', '/dashboard/subjectdata');
    cy.contains('Todas las asignaturas').should('be.visible');
    
    // Test navigation to profile
    cy.get('[aria-label="Perfil"]').click();
    cy.url().should('include', '/dashboard/profile');
    cy.contains('Perfil de Usuario').should('be.visible');
    
    // Test navigation to settings
    cy.get('[aria-label="Ajustes"]').click();
    cy.url().should('include', '/dashboard/settings');
    cy.contains('Configuración').should('be.visible');
    
    // Test navigation back to dashboard
    cy.get('[aria-label="Dashboard"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard Académico').should('be.visible');
  });

  it('should search for subjects', () => {
    cy.login(Cypress.env('testUser').email, Cypress.env('testUser').password);
    
    // Find search input
    cy.get('input[placeholder*="Busca una asignatura"]').type('Cálculo');
    
    // Wait for search results
    cy.get('[role="listbox"]').should('be.visible');
    
    // Click on first result
    cy.get('[role="listbox"] li').first().click();
    
    // Verify navigation to subject details
    cy.url().should('match', /\/dashboard\/subjectdata\/\d+/);
    cy.contains('Cálculo').should('be.visible');
  });

  it('should logout successfully', () => {
    cy.login(Cypress.env('testUser').email, Cypress.env('testUser').password);
    
    // Click logout
    cy.get('[aria-label="Cerrar Sesión"]').click();
    
    // Verify redirect to login
    cy.url().should('include', '/login');
    
    // Verify cookie is cleared
    cy.getCookie('user').should('not.exist');
  });
});