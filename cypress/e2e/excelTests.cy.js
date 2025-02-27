// cypress/e2e/excelTests.cy.js
describe("Login Tests", () => {
  before(() => {
    cy.generateCredentialsFile("cypress/fixtures/testData.xlsx");
  });

  it("should login with valid credentials from Excel", () => {
    cy.readExcelFile("testData.xlsx").then((credentials) => {
      credentials.forEach((credential) => {
        cy.visit(
          "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
        );
        cy.get('input[name="username"]').type(credential.Username);
        cy.get('input[name="password"]').type(credential.Password);
        cy.get('button[type="submit"]').click();
        // Add assertions to verify successful login
      });
    });
  });
});
