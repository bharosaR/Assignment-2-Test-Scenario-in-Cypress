import RecruitmentPage from "../pages/recruitmentPage";

describe("Recruitment Page Automation", () => {
  beforeEach(() => {
    // Restore session (if login cookies are stored)
    cy.readFile("cypress/fixtures/loginCookies.json").then((cookies) => {
      if (cookies.length > 0) {
        cookies.forEach((cookie) => {
          cy.setCookie(cookie.name, cookie.value);
        });
      } else {
        throw new Error("No login cookies found!");
      }
    });

    // Navigate to Recruitment Page
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
  });

  it("Should add a new candidate and verify details", () => {
    cy.fixture("candidateDetails.json").then((candidate) => {
      RecruitmentPage.navigateToRecruitment();
      RecruitmentPage.clickAddCandidate();
      RecruitmentPage.fillCandidateForm(candidate);

      // Verify "Shortlist" button appears with green color
      RecruitmentPage.verifyShortlistButton();

      // Verify first name is displayed correctly
      RecruitmentPage.verifyCandidateName(candidate.firstName);
    });
  });
});
