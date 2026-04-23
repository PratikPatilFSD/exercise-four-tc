// Institute Page Object (REAL UI BASED)
// Handles all interactions related to Institute Selection screen

export class InstitutePage {
  constructor(page) {
    this.page = page;

    // Search input field for filtering institutes
    this.searchBox = page.getByPlaceholder('Search your institute...');

    // Loading indicator text shown while data is fetching
    this.loadingText = page.getByText('Loading...');
  }

  // Wait until page network activity is idle (ensures data is loaded)
  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
  }

  // Select an institute by its visible name
  async selectInstitute(name) {
    await this.page.getByText(name).click();
  }

  // Enter text in search box to filter institutes
  async searchInstitute(text) {
    await this.searchBox.fill(text);
  }
}