class AdminPage {
  constructor() {
    this.adminMenu = ":nth-child(1) > .oxd-main-menu-item"; // Corrected selector for Admin menu
    this.usernameSearchInput = ":nth-child(2) > .oxd-input.oxd-input--active"; // Username search input
    this.searchButton = '[type="submit"]'; // Search button
    this.noRecordsFoundMessage = ".oxd-text.oxd-text--span"; // "No Records Found" message
  }

  navigateToAdminPage() {
    cy.get(this.adminMenu).click(); // Clicking the Admin menu
    cy.url().should("include", "/admin"); // Ensure we're on the Admin page
  }

  searchUser(username) {
    cy.get(this.usernameSearchInput).type("Test 123"); // Enter the username in search
    cy.get(this.searchButton).click(); // Click the search button
  }

  verifyNoRecordsFound() {
    cy.contains("No Records Found").should("be.visible"); // Assert "No Records Found" is visible
  }
}

// Correctly export the AdminPage class
export default new AdminPage();
