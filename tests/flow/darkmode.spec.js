// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Import Page Objects
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

// Import test data
import { users } from '../../utils/testData';

// Test suite for Dark Mode functionality
test.describe('Dark Mode (REAL FLOW)', () => {

  // ================= TC_26 =================
  // Verify dark mode is applied when theme is set in localStorage
  test('TC_25 Enable Dark Mode', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    // Open application
    await page.goto('/');

    // Set dark mode BEFORE login (simulate user preference)
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Perform login
    await login.login(users.singleRoleUser.email, users.singleRoleUser.password);

    // Wait for dashboard
    await page.waitForURL('**/dashboard');

    // Verify dark mode is applied
    const isDark = await dashboard.isDarkModeApplied();
    expect(isDark).toBeTruthy();
  });


  // ================= TC_27 =================
  // Verify dark mode persists after page refresh
  test('TC_26 Persist Dark Mode after refresh', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await page.goto('/');

    // Enable dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Login
    await login.login(users.singleRoleUser.email, users.singleRoleUser.password);

    await page.waitForURL('**/dashboard');

    // Refresh page
    await page.reload();

    // Verify dark mode still applied
    const isDark = await dashboard.isDarkModeApplied();
    expect(isDark).toBeTruthy();
  });


  // ================= TC_28 =================
  // Verify text visibility in dark mode
  test('TC_27 Text visibility in dark mode', async ({ page }) => {

    const login = new LoginPage(page);

    await page.goto('/');

    // Enable dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Login
    await login.login(users.singleRoleUser.email, users.singleRoleUser.password);

    await page.waitForURL('**/dashboard');

    // Validate important UI text is visible in dark mode
    await expect(
      page.getByText('Active Institutes', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Inactive Institutes', { exact: true })
    ).toBeVisible();
  });


  // ================= TC_29 =================
  // Verify dark mode remains consistent during navigation
  test('TC_28 Navigation maintains dark mode', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await page.goto('/');

    // Enable dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Login with multi-role user
    await login.login(users.multiRoleUser.email, users.multiRoleUser.password);

    // Wait for role page
    await page.waitForURL('**/select-role');

    // Select role to navigate to dashboard
    await page.getByText('Admin', { exact: true }).click();

    await page.waitForURL('**/dashboard');

    // Verify dark mode is still applied
    const isDark = await dashboard.isDarkModeApplied();
    expect(isDark).toBeTruthy();
  });


  // ================= TC_30 =================
  // Verify error messages are visible in dark mode
  test('TC_29 Error UI visible in dark mode', async ({ page }) => {

    await page.goto('/');

    // Enable dark mode
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });

    // Trigger validation error without entering data
    await page.getByRole('button', { name: 'Continue' }).click();

    // Verify error message is visible
    await expect(page.getByText('Email cannot be empty')).toBeVisible();
  });

});