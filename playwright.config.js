// Playwright configuration file

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,  // Run with browser visible
    slowMo: 500,      // Slow down execution (for demo)
    baseURL: 'https://frontend-backend-exercise-1.onrender.com'
  }
});