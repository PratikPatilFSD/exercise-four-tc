// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Import Page Objects
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

// Import test data
import { users } from '../../utils/testData';

// Test suite for Logout Module
test.describe('Logout Module (REAL FLOW)', () => {

  // ================= TC_24 =================
  // Verify user is redirected to login page after clicking logout
  test('TC_22 Logout click → redirect to login', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const user = users.singleRoleUser;

    // Open application
    await page.goto('/');

    // Perform login
    await login.login(user.email, user.password);

    // Wait for dashboard
    await page.waitForURL('**/dashboard');

    // Click logout button
    await dashboard.logout();

    // Wait for redirection to login page
    await page.waitForURL('**/');

    // Validate URL is login page
    await expect(page).toHaveURL('/');
  });


  // ================= TC_25 =================
  // Verify login page UI is visible after logout
  test('TC_23 After logout → login page visible', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const user = users.singleRoleUser;

    await page.goto('/');

    // Perform login
    await login.login(user.email, user.password);

    await page.waitForURL('**/dashboard');

    // Logout action
    await dashboard.logout();

    await page.waitForURL('**/');

    // Validate login input fields are visible
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

});