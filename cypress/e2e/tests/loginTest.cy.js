import LoginPage from "../pages/loginPage";

describe("OrangeHRM Login Test with Cookie Storage", () => {
  before(() => {
    // Login once and store cookies
    LoginPage.loginAndStoreSession("Admin", "admin123");
  });

  beforeEach(() => {
    // Restore session before every test
    LoginPage.restoreSession();
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });

  it("Should verify login using stored cookies", () => {
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");
  });
});
