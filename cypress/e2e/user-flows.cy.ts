/// <reference types="cypress" />

describe('DASOS User Flows', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('/');
  });

  describe('Authentication Flow', () => {
    it('should redirect to login when not authenticated', () => {
      cy.url().should('include', '/login');
      cy.contains('DASOS UPM').should('be.visible');
      cy.contains('Inicia sesión').should('be.visible');
    });

    it('should login with valid credentials', () => {
      cy.url().should('include', '/login');
      
      // Fill login form
      cy.get('input[type="email"]').type('student@example.com');
      cy.get('input[type="password"]').type('password123');
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard Académico').should('be.visible');
    });

    //it('should show error with invalid credentials', () => {
    //  cy.get('input[type="email"]').type('invalid-email');
    //  cy.get('input[type="password"]').type('password');
    //  cy.get('button[type="submit"]').click();
      
      // Should show error message
    //  cy.get('[role="alert"]').should('be.visible');
    //  cy.url().should('include', '/login');
    //});

    it('should logout successfully', () => {
      // Login first
      cy.login('student@example.com', 'password123');
      
      // Click logout
      cy.get('[aria-label="Cerrar Sesión"]').click();
      
      // Should redirect to login
      cy.url().should('include', '/login');
    });
  });

  describe('Dashboard Navigation', () => {
    beforeEach(() => {
      cy.login('student@example.com', 'password123');
    });

    it('should display dashboard with key metrics', () => {
      cy.contains('Dashboard Académico').should('be.visible');
      
      // Check stats cards
      cy.contains('Total de asignaturas').should('be.visible');
      cy.contains('Años académicos').should('be.visible');
      cy.contains('Datos históricos').should('be.visible');
      cy.contains('Análisis API').should('be.visible');
    });

    it('should navigate to subjects page', () => {
      cy.get('[aria-label="Buscar"]').click();
      
      cy.url().should('include', '/dashboard/subjectdata');
      cy.contains('Todas las asignaturas').should('be.visible');
    });

    it('should navigate to profile page', () => {
      cy.get('[aria-label="Perfil"]').click();
      
      cy.url().should('include', '/dashboard/profile');
      cy.contains('Perfil de Usuario').should('be.visible');
    });

    it('should navigate to settings page', () => {
      cy.get('[aria-label="Ajustes"]').click();
      
      cy.url().should('include', '/dashboard/settings');
      cy.contains('Configuración').should('be.visible');
    });
  });

  describe('Subject Search and Details', () => {
    beforeEach(() => {
      cy.login('student@example.com', 'password123');
    });

    it('should search for subjects', () => {
      // Type in search bar
      cy.get('input[placeholder*="Busca una asignatura"]').type('Cálculo');
      
      // Wait for results
      cy.get('[role="listbox"]', { timeout: 10000 }).should('be.visible');
      cy.contains('Cálculo').should('be.visible');
      
      // Click on result
      cy.contains('Cálculo').click();
      
      // Should navigate to subject details
      cy.url().should('match', /\/dashboard\/subjectdata\/\d+/);
    });

    it('should display subject performance data', () => {
      // Navigate to a specific subject
      cy.visit('/dashboard/subjectdata/105000005');
      
      // Check subject header
      cy.contains('Cálculo').should('be.visible');
      cy.contains('105000005').should('be.visible');
      cy.contains('6 créditos').should('be.visible');
      
      // Check performance metrics
      cy.contains('Tasa de rendimiento').should('be.visible');
      cy.contains('Tasa de éxito').should('be.visible');
      cy.contains('Tasa de absentismo').should('be.visible');
      
      // Check charts
      cy.get('canvas').should('have.length.at.least', 1);
    });

    it('should switch between analysis and info tabs', () => {
      cy.visit('/dashboard/subjectdata/105000005');
      
      // Should be on analysis tab by default
      cy.contains('Histórico de Rendimiento').should('be.visible');
      
      // Click info tab
      cy.contains('Información de asignatura').click();
      
      // Should show subject info
      cy.url().should('include', '/info');
      cy.contains('Departamento').should('be.visible');
      cy.contains('Plan de estudios').should('be.visible');
    });
  });

  describe('Subject Information Page', () => {
    beforeEach(() => {
      cy.login('student@example.com', 'password123');
      cy.visit('/dashboard/subjectdata/105000005/info');
    });

    it('should display faculty information', () => {
      cy.contains('Profesorado').should('be.visible');
      
      // Check faculty table headers
      cy.contains('Nombre').should('be.visible');
      cy.contains('Despacho').should('be.visible');
      cy.contains('Email').should('be.visible');
      cy.contains('Tutorías').should('be.visible');
    });

    it('should display evaluation methods', () => {
      cy.contains('Actividades de evaluación').scrollIntoView();
      cy.contains('Actividades de evaluación').should('be.visible');
      
      // Check evaluation sections
      cy.contains('Evaluación continua').should('be.visible');
      cy.contains('Denominación').should('be.visible');
      cy.contains('Peso (%)').should('be.visible');
    });

    it('should display resources', () => {
      cy.contains('Recursos didácticos').scrollIntoView();
      cy.contains('Recursos didácticos').should('be.visible');
      cy.contains('Bibliografía recomendada').should('be.visible');
    });
  });

  describe('Performance Metrics', () => {
    it('should load dashboard quickly', () => {
      cy.login('student@example.com', 'password123');
      
      // Measure page load time
      cy.window().then((win) => {
        const performance = win.performance;
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        // Page should load in less than 3 seconds
        expect(navigation.loadEventEnd - navigation.fetchStart).to.be.lessThan(3000);
      });
    });

    it('should have good Lighthouse scores', () => {
      // This would typically be run with cypress-audit plugin
      // cy.lighthouse({
      //   performance: 0.8,
      //   accessibility: 0.9,
      //   'best-practices': 0.8,
      //   seo: 0.8,
      // });
    });
  });

});

