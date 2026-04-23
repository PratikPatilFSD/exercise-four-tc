// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Import Page Objects
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

// Import test data
import { users } from '../../utils/testData';

// Test suite for Dashboard Module
test.describe('Dashboard Module (REAL FLOW)', () => {

  // ================= TC_20 =================
  // Verify dashboard loads successfully after login
  test('TC_18 Load Dashboard', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const user = users.singleRoleUser;

    // Open application
    await page.goto('/');

    // Perform login
    await login.login(user.email, user.password);

    // Wait for dashboard navigation
    await page.waitForURL('**/dashboard');

    // Validate correct page and welcome text
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboard.welcomeText).toBeVisible();
  });


  // ================= TC_21 =================
  // Verify logged-in user's name is displayed correctly
  test('TC_19 User Name visible', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.singleRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/dashboard');

    // Fetch username from localStorage
    const userName = await page.evaluate(() =>
      localStorage.getItem('userName')
    );

    // Validate username is visible in UI
    await expect(
      page.getByText(`Hi, ${userName}`)
    ).toBeVisible();
  });


  // ================= TC_22 =================
  // Verify all important UI elements are visible on dashboard
  test('TC_20 UI Elements visible', async ({ page }) => {

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const user = users.singleRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/dashboard');

    // Validate header elements
    await expect(dashboard.logoText.first()).toBeVisible();
    await expect(dashboard.logoutBtn).toBeVisible();

    // Validate dashboard cards
    await expect(dashboard.activeInstitutes).toBeVisible();
    await expect(dashboard.inactiveInstitutes).toBeVisible();
    await expect(dashboard.totalModules).toBeVisible();
    await expect(dashboard.totalUsers).toBeVisible();
  });


  // ================= TC_23 =================
  // Verify session persists after page refresh
  test('TC_21 Refresh → session persists', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.singleRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/dashboard');

    // Refresh page
    await page.reload();

    // Validate user stays on dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

});