class RecruitmentPage {
  constructor() {
    this.recruitmentMenu = '.oxd-main-menu-item[href*="recruitment"]'; // Recruitment menu locator
    this.addButton =
      ":nth-child(1) > .oxd-button.oxd-button--medium.oxd-button--secondary"; // Add button
    this.firstNameInput = '[name="firstName"]'; // First Name
    this.middleNameInput = '[name="middleName"]'; // Middle Name
    this.lastNameInput = '[name="lastName"]'; // Last Name
    this.vacancyDropdown = ".oxd-select-text"; // Vacancy dropdown
    this.emailInput = ".oxd-input.oxd-input--active"; // Email field
    this.contactNumberInput = ".oxd-input.oxd-input--active"; // Contact number
    this.resumeUpload = 'input[type="file"]'; // Resume upload
    this.keywordsInput = ".oxd-input.oxd-input--active"; // Keywords field
    this.dateOfApplication = 'input[placeholder="yyyy-dd-mm"]'; // Date picker
    this.notesInput = "textarea"; // Notes field
    this.consentCheckbox = ".oxd-checkbox-input--active"; // Consent checkbox (use parent span)
    this.saveButton = 'button[type="submit"]'; // Save button
    this.shortlistButton = 'button:contains("Shortlist")'; // Shortlist button (for verification)
    this.candidateName = ".candidate-name"; // Candidate name verification (Update selector as needed)
  }

  navigateToRecruitment() {
    cy.get(this.recruitmentMenu).click();
    cy.url().should("include", "/recruitment");
  }

  clickAddCandidate() {
    cy.get(this.addButton).click();
  }

  fillCandidateForm(candidate) {
    cy.get(this.firstNameInput).type(candidate.firstName);
    cy.get(this.middleNameInput).type(candidate.middleName);
    cy.get(this.lastNameInput).type(candidate.lastName);

    cy.get(this.vacancyDropdown).click();
    cy.contains(candidate.vacancy).click(); // Select from dropdown

    cy.get(this.emailInput).eq(4).type(candidate.email);
    cy.get(this.contactNumberInput).eq(4).type(candidate.contactNumber);

    // Ensuring the file input is visible before interacting with it
    cy.get(this.resumeUpload).selectFile(candidate.resumePath, { force: true });

    cy.get(this.keywordsInput).eq(5).type(candidate.keywords);
    cy.get(this.dateOfApplication).clear().type(candidate.dateOfApplication);
    cy.get(this.notesInput).type(candidate.notes);

    // Call the method to interact with the consent checkbox
    this.checkConsentCheckbox();

    cy.get(this.saveButton).click();
  }

  // Method to interact with the consent checkbox
  checkConsentCheckbox() {
    cy.get(this.consentCheckbox)
      .should("exist") // Ensure the checkbox exists in the DOM
      .click({ force: true }); // Force the click, even if not visible
  }

  verifyShortlistButton() {
    cy.contains("button", "Shortlist") // Look for button with text "Shortlist"
      .should("be.visible") // Ensure it's visible
      .and("have.css", "background-color", "rgb(52, 188, 64)"); // Check for the correct green color
  }

  verifyCandidateName(expectedName) {
    cy.get(this.candidateName).should("contain.text", expectedName);
  }
}

export default new RecruitmentPage();
