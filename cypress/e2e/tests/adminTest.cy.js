import AdminPage from "../pages/adminPage"; // Correct import

describe("Admin Page Search Test", () => {
  beforeEach(() => {
    // Read cookies from the login test fixture
    cy.readFile("cypress/fixtures/loginCookies.json").then((cookies) => {
      if (cookies.length > 0) {
        // Set the cookies to restore the session
        cy.log("Using stored login cookies...");
        cookies.forEach((cookie) => {
          cy.setCookie(cookie.name, cookie.value); // Only setting name and value
        });
      } else {
        throw new Error("No cookies found! Run loginTest.cy.js first.");
      }
    });

    // Visit the homepage or dashboard page
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });

  it("Should search for 'Test 123' and show 'No Records Found'", () => {
    AdminPage.navigateToAdminPage(); // Now using AdminPage directly
    AdminPage.searchUser("Test 123");
    AdminPage.verifyNoRecordsFound();
  });
});
