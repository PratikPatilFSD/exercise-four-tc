// Reusable function to perform complete login flow
// Covers: Login → Institute selection → Role selection → Dashboard

export const completeLoginFlow = async (page, user, options = {}) => {

  // Destructure options with default values
  // instituteIndex → which institute to select
  // roleIndex → which role to select
  const { instituteIndex = 0, roleIndex = 0 } = options;

  // Navigate to login page
  await page.goto('/');

  // Fill login credentials
  await page.fill('input[type="email"]', user.email);
  await page.fill('input[type="password"]', user.password);

  // Click Login button
  await page.click('button:has-text("Login")');

  // ================= NO INSTITUTE CASE =================
  // If user has no institutes, flow ends here
  if (!user.institutes || user.institutes.length === 0) return;

  // Select institute based on provided index
  const institute = user.institutes[instituteIndex];

  // Click on institute name from UI
  await page.click(`text=${institute.name}`);

  // ================= NO ROLE CASE =================
  // If selected institute has no roles → direct dashboard
  if (!institute.roles || institute.roles.length === 0) return;

  // Select role based on provided index
  const role = institute.roles[roleIndex];

  // Click role from UI
  await page.click(`text=${role}`);

  // Click Continue to proceed to dashboard
  await page.click('button:has-text("Continue")');
};