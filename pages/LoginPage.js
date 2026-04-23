// Login Page Object (REAL UI BASED)
// Handles all interactions related to Login screen

export class LoginPage {
  constructor(page) {
    this.page = page;

    // ================= SELECTORS =================

    // Username input field (uses placeholder text)
    this.username = page.getByPlaceholder('Username');

    // Password input field (uses placeholder text)
    this.password = page.getByPlaceholder('Password');

    // Continue button used to submit login form
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
  }

  // ================= ACTION =================

  // Perform login using provided credentials
  async login(email, password) {

    // Wait until page is fully loaded and network is idle
    await this.page.waitForLoadState('networkidle');

    // Enter username
    await this.username.fill(email);

    // Enter password
    await this.password.fill(password);

    // Click Continue button to submit login
    await this.continueBtn.click();
  }
}