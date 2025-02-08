import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/#',
    chromeWebSecurity: false,
    viewportWidth: 375,
    viewportHeight: 750,
    defaultCommandTimeout: 5000,
    testIsolation: false,
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/e2e/**/*.spec.*',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
  },
})
