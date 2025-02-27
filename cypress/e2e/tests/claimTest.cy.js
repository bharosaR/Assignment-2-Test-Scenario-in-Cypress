// cypress/e2e/claimrequest.cy.js

describe("Claim Page API Test", () => {
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
      "https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim"
    );
  });

  it("should get the response from the server and validate the response keys and values", () => {
    // Perform the GET request to the Claim API
    cy.request({
      method: "GET",
      url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/events?limit=0&status=true", // Correct URL for the Claim API
      headers: {},
    }).then((response) => {
      // Assert the status code
      expect(response.status).to.eq(200);

      // Assert the response contains the expected keys: data, meta, and rels
      expect(response.body).to.have.all.keys("data", "meta", "rels");

      // Verify "id": 2 and "name": "Medical Reimbursement" are present in the response
      const medicalReimbursement = response.body.data.find(
        (item) => item.id === 2 && item.name === "Medical Reimbursement"
      );
      expect(medicalReimbursement).to.exist; // Assert that the object exists
    });
  });
});
