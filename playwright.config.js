// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  timeout: 40000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'https://dailyfinance.roadtocareer.net/',
    headless: false,
    viewport: null, // disables Playwright's default size
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      args: ['--start-maximized'], // important to start maximized
    },
  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null, // MUST be null to let browser control size
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
