import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Folders
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Environment variables
    env: {
      apiUrl: 'http://localhost:5000/api/v1',
      coverage: true,
      testUser: {
        email: 'student@example.com',
        password: '1234',
      }
      
    },
    // Plugins

    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Code coverage      
      // Visual regression testing
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        table(message) {
          console.table(message)
          return null
        },
      })

    },
    
  },
  
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
  
  // Cypress Cloud settings
  projectId: 'xdm4nk',
  
  // Retries
  retries: {
    runMode: 2,
    openMode: 0,
  },
  
  // Browser settings
  chromeWebSecurity: false,
  
  // Screenshots and videos
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  trashAssetsBeforeRuns: true,
  
  // Experimental features
  experimentalStudio: true,
  experimentalWebKitSupport: true,
})
