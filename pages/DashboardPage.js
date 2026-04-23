// Dashboard Page Object (STRICT SAFE + LOGOUT SUPPORT)

export class DashboardPage {
  constructor(page) {
    this.page = page;

    // ================= HEADER =================
    this.logoText = page.locator('span').filter({ hasText: 'SchoolCoreOS' });
    this.logoutBtn = page.getByRole('button', { name: /logout/i });

    // ================= TITLE =================
    this.welcomeText = page.getByRole('heading', {
      name: /Welcome to SchoolCoreOS Dashboard/i
    });

    // ================= CARDS =================
    this.activeInstitutes = page.getByText('Active Institutes', { exact: true });
    this.inactiveInstitutes = page.getByText('Inactive Institutes', { exact: true });
    this.totalModules = page.getByText('Total Modules', { exact: true });
    this.totalUsers = page.getByText('Total Users', { exact: true });

    // ================= LOGIN PAGE CHECK (for logout validation) =================
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
  }

  // ================= ACTIONS =================

  async logout() {
    await this.logoutBtn.click();
  }

  // ================= VALIDATIONS =================

  async isDashboardLoaded() {
    await this.page.waitForURL('**/dashboard');
    return this.welcomeText.isVisible();
  }

  async isLoginPageVisible() {
    await this.page.waitForURL('**/');
    return (
      await this.usernameInput.isVisible() &&
      await this.passwordInput.isVisible()
    );
  }

  // ================= DARK MODE =================

  async enableDarkMode() {
    await this.page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
  }

  async isDarkModeApplied() {
    const bg = await this.page.evaluate(() =>
      window.getComputedStyle(document.body).backgroundColor
    );

    return bg !== 'rgb(243, 244, 246)'; // light bg
  }
}