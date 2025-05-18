// @ts-check
import { test, expect } from "@playwright/test";
import jsonData from "../utils/userData.json";
import LoginPage from "../pages/LoginPage";

test("Try to User Login with invalid credential", async ({ page }) => {
  await page.goto("/");

  const email = "invalidmail123@gmail.com";
  const pass = "wrongpassword";

  const login = new LoginPage(page);

  await login.doLogin(email, pass);
  await expect(page.getByRole("paragraph")).toContainText(
    "Invalid email or password"
  );
});

test("Newly created user login and add items", async ({ page }) => {
  await page.goto("/");

  const latestUser = jsonData[jsonData.length - 1];

  const login = new LoginPage(page);

  await login.doLogin(latestUser.email, latestUser.password);

  await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 20000 });
  await page.pause();
});
