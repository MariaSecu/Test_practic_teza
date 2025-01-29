const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directorul unde sunt testele tale
  timeout: 60 * 1000, // Timeout per test
  retries: 1, // Număr de reîncercări în caz de eșec
  reporter: [['html'], ['list']], // Reporter pentru rezultate
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false, // Rularea testelor într-o fereastră vizibilă
        navigationTimeout: 60 * 1000,  // Setează timeout-ul pentru navigare
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: false,
      },
    },
  ],
});
