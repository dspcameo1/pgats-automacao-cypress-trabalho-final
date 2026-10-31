const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Relatorio PGATS',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
