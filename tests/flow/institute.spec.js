// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Import Page Objects
import { LoginPage } from '../../pages/LoginPage';
import { InstitutePage } from '../../pages/InstitutePage';

// Import test data
import { users } from '../../utils/testData';

// Test suite for Institute Module
test.describe('Institute Module (REAL FLOW)', () => {

  // ================= TC_10 =================
  // Verify institutes are loaded for multi-institute user
  test('Load Institutes (REAL)', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.multiInstituteUser;

    // Open application
    await page.goto('/');

    // Perform login
    await login.login(user.email, user.password);

    // Wait for API/data load
    await page.waitForLoadState('networkidle');

    // Validate correct page
    await expect(page).toHaveURL(/select-institute/);

    // Validate institute is visible
    await expect(page.getByText(user.institutes[0].name)).toBeVisible();
  });


  // ================= TC_11 =================
  // Verify selecting an institute navigates correctly
  test('Select Institute (multi institute user)', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.multiInstituteUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    // Wait for institute page
    await page.waitForURL('**/select-institute');

    // Select first institute
    await page.getByText(user.institutes[0].name).click();

    // Validate navigation based on roles
    if (user.institutes[0].roles.length === 1) {
      // Direct dashboard if only one role
      await page.waitForURL('**/dashboard');
    } else {
      // Go to role selection if multiple roles
      await page.waitForURL('**/select-role');
    }
  });


  // ================= TC_12 =================
  // Verify alert appears when institute has no roles
  test('Institute with NO ROLES (should show alert)', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.multiInstituteUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/select-institute');

    // Find institute with no roles
    const noRoleInst = user.institutes.find(i => i.roles.length === 0);

    // Handle alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('No role assigned');
      await dialog.dismiss();
    });

    // Click institute with no roles
    await page.getByText(noRoleInst.name).click();
  });


  // ================= TC_13 =================
  // Verify search functionality for institutes
  test('Search Institute', async ({ page }) => {

    const login = new LoginPage(page);
    const institute = new InstitutePage(page);
    const user = users.multiInstituteUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    await page.waitForURL('**/select-institute');

    // Search institute by name
    await institute.searchInstitute('North');

    // Validate filtered result is visible
    await expect(page.getByText('North Park Academy')).toBeVisible();
  });


  // ================= TC_14 (EDGE CASE) =================
  // Verify single institute user skips institute page
  test('Single Institute User → redirect to role', async ({ page }) => {

    const login = new LoginPage(page);
    const user = users.multiRoleUser;

    await page.goto('/');
    await login.login(user.email, user.password);

    // Should directly navigate to role page
    await page.waitForURL('**/select-role');
  });

});