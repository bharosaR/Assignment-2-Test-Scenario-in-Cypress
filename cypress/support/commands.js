// cypress/support/commands.js

Cypress.Commands.add("loginAndSaveCookies", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  ); // Visit the login page

  // Fill in login details
  cy.get('input[name="username"]').type("Admin");
  cy.get('input[name="password"]').type("admin123");

  // Submit the login form
  cy.get('button[type="submit"]').click();

  // Wait for the page to load and ensure login is successful
  cy.url().should("include", "/dashboard"); // Adjust the URL to your application's landing page after login

  // Save the cookies for reuse
  cy.getCookies().then((cookies) => {
    cy.writeFile("cypress/fixtures/cookies.json", cookies); // Save cookies to a file
  });
});

// cypress/support/commands.js

const XLSX = require("xlsx");

// Custom command to generate credentials file
Cypress.Commands.add("generateCredentialsFile", (filePath) => {
  const data = [
    { Username: "Admin", Password: "admin123" },
    // Add more credentials as needed
  ];

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Credentials");
  XLSX.writeFile(wb, filePath);
});

// Custom command to read the Excel file
Cypress.Commands.add("readExcelFile", (filePath) => {
  return cy.task("readExcelFile", filePath);
});
