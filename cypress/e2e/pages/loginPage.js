class LoginPage {
  constructor() {
    this.usernameInput = '[name="username"]';
    this.passwordInput = '[name="password"]';
    this.loginButton = '[type="submit"]';
  }

  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  loginAndStoreSession(username, password) {
    cy.session("loginSession", () => {
      this.visit();
      this.enterUsername(username);
      this.enterPassword(password);
      this.clickLogin();

      // Ensure login is successful before saving session
      cy.url().should("include", "/dashboard");

      // Store cookies in a local file
      cy.getCookies().then((cookies) => {
        cy.writeFile("cypress/fixtures/cookies.json", cookies);
      });
    });
  }

  restoreSession() {
    cy.readFile("cypress/fixtures/cookies.json").then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });
  }
}

export default new LoginPage();
