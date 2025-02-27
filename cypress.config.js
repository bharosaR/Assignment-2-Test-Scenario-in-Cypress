// cypress.config.js
const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, Config) {
      //implement node event listeners here
    },
  },
});

const path = require("path");
const XLSX = require("xlsx");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        readExcelFile(filePath) {
          const absolutePath = path.resolve(
            __dirname,
            "cypress/fixtures",
            filePath
          );
          const workbook = XLSX.readFile(absolutePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          return data;
        },
      });
    },
  },
};
