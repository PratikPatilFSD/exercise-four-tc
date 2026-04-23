// Import Playwright test utilities
import { test, expect } from '@playwright/test';

// Import Page Object for login
import { LoginPage } from '../../pages/LoginPage';

// Import test data (users)
import { users } from '../../utils/testData';

// Test suite for Login Module
test.describe('Login Module (All Cases)', () => {

  // Runs before each test → opens login page
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ================== TC_01 ======================
  // Valid login with multi-institute user
  test('TC_01 Valid Login (multi institute)', async ({ page }) => {

    const user = users.multiInstituteUser;

    // Fill credentials
    await page.getByPlaceholder('Username').fill(user.email);
    await page.getByPlaceholder('Password').fill(user.password);

    // Click Continue and wait for navigation
    await Promise.all([
      page.waitForURL('**/select-institute'),
      page.getByRole('button', { name: 'Continue' }).click()
    ]);

    // Validate navigation to institute page
    await expect(page).toHaveURL(/select-institute/);
  });

  // ================== TC_02 ======================
  // Invalid password should not allow login
  test('Invalid Password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(users.invalidUser.email, users.invalidUser.password);

    // Should remain on login page
    await expect(page).toHaveURL('/');
  });

  // ================== TC_03 ======================
  // Invalid email format validation
  test('Invalid Email Format', async ({ page }) => {
    const login = new LoginPage(page);

    await login.login("invalidemail", "123");

    // Validate error message
    await expect(page.getByText('Email must contain @')).toBeVisible();
  });

  // ================== TC_04 ======================
  // Empty fields validation
  test('Empty Fields', async ({ page }) => {

    // Click without entering anything
    await page.getByRole('button', { name: 'Continue' }).click();

    // Validate error message
    await expect(page.getByText('Email cannot be empty')).toBeVisible();
  });

  // ================== TC_05 ======================
  // Only email entered (missing password)
  test('Only Email', async ({ page }) => {

    await page.getByPlaceholder('Username').fill(users.singleRoleUser.email);
    await page.getByRole('button', { name: 'Continue' }).click();

    // Validate password error
    await expect(page.getByText('Invalid Password')).toBeVisible();
  });

  // ================== TC_06 ======================
  // Only password entered (missing email)
  test('Only Password', async ({ page }) => {

    await page.getByPlaceholder('Password').fill(users.singleRoleUser.password);
    await page.getByRole('button', { name: 'Continue' }).click();

    // Validate email error
    await expect(page.getByText('Email cannot be empty')).toBeVisible();
  });

  // ================== TC_07 ======================
  // Email contains spaces → invalid input
  test('Spaces in Email', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('abc def');
    await page.getByPlaceholder('Password').fill('123');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Validate error message
    await expect(page.getByText('Email cannot contain spaces')).toBeVisible();
  });

  // ================== TC_08 ======================
  // Error UI visibility check
  test('Error UI visible', async ({ page }) => {

    await page.getByRole('button', { name: 'Continue' }).click();

    // Validate error appears
    await expect(page.getByText('Email cannot be empty')).toBeVisible();
  });

  // ================== TC_09 ======================
  // User with no institute
  test('No Institute User', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login(users.noInstituteUser.email, users.noInstituteUser.password);

    // Expect navigation to institute selection (based on backend behavior)
    await expect(page).toHaveURL(/select-institute/);
  });

});