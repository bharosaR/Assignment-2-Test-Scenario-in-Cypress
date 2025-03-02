describe("OrangeHRM Mobile Responsiveness", () => {
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

    // Visit the OrangeHRM Admin page after setting cookies (logged in)
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
    );
  });

  const devices = [
    { name: "iPhone-6", width: 375, height: 667 },
    { name: "iPhone-X", width: 375, height: 812 },
    { name: "iPad", width: 768, height: 1024 },
    { name: "MacBook-15", width: 1440, height: 900 },
  ];

  devices.forEach((device) => {
    it(`should be responsive on ${device.name}`, () => {
      cy.viewport(device.width, device.height); // Set the viewport to the device size

      // Visit the OrangeHRM Admin page after login
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
      );

      // Wait for a few seconds to let the page adjust for responsiveness
      cy.wait(5000); // Adjust time in milliseconds as needed (5000 ms = 5 seconds)
    });
  });
});
