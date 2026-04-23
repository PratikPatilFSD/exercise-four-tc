// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Import Page Objects
import { LoginPage } from '../../pages/LoginPage';
import { RolePage } from '../../pages/RolePage';

// Import test data
import { users } from '../../utils/testData';

// Test suite for Role Module
test.describe('Role Module (REAL FLOW)', () => {

  // ================= TC_15 =================
  // Verify user can switch institute from role page (only for multi-institute users)
  test('TC_14 Switch Institute (only multi-institute user)', async ({ page }) => {

    const login = new LoginPage(page);
    const rolePage = new RolePage(page);
    const user = users.multiInstituteUser;

    // Open application
    await page.goto('/');

    // Perform login
    await login.login(user.email, user.password);

    // Navigate to institute selection page
    await page.waitForURL('**/select-institute');

    // Select an institute that has multiple roles
    const inst = user.institutes.find(i => i.roles.length > 1);
    await page.getByText(inst.name).click();

    // Wait for role page
    await page.waitForURL('**/select-role');

    // Click "Change Institute" button
    await rolePage.clickChangeInstitute();

    // Validate user is redirected back to institute page
    await expect(page).toHaveURL(/select-institute/);
  });


  // ================= TC_16 =================
  // Verify roles are loaded and visible
  test('TC_15 Load Roles', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.multiRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    // Wait for role selection page
    await page.waitForURL('**/select-role');

    // Validate all roles are visible
    for (const role of user.institutes[0].roles) {
      await expect(
        page.getByText(role, { exact: true })
      ).toBeVisible();
    }
  });


  // ================= TC_17 =================
  // Verify selecting a role navigates to dashboard
  test('TC_16 Select Role → Dashboard', async ({ page }) => {

    const login = new LoginPage(page);
    const rolePage = new RolePage(page);
    const user = users.multiRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/select-role');

    // Select first role
    await rolePage.selectRole(user.institutes[0].roles[0]);

    // Validate navigation to dashboard
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);
  });


  // ================= TC_18 =================
  // Verify multiple roles are displayed correctly
  test('TC_17 Multiple Roles visible', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.multiRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/select-role');

    // Ensure user has multiple roles
    expect(user.institutes[0].roles.length).toBeGreaterThan(1);

    // Validate each role is visible
    for (const role of user.institutes[0].roles) {
      await expect(
        page.getByText(role, { exact: true })
      ).toBeVisible();
    }
  });


  // ================= TC_19 =================
  // Verify each role can be selected successfully
  test('Role click works for all roles', async ({ page }) => {

    const login = new LoginPage(page);
    const rolePage = new RolePage(page);
    const user = users.multiRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/select-role');

    // Loop through all roles and validate navigation
    for (const role of user.institutes[0].roles) {

      // Select role
      await rolePage.selectRole(role);

      // Verify dashboard navigation
      await page.waitForURL('**/dashboard');

      // Navigate back to role page
      await page.goBack();
      await page.waitForURL('**/select-role');
    }
  });

});