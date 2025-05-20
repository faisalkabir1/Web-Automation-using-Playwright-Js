// @ts-check
import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import jsonData from "../resources/Updatedcredentials.json";
const latestUserData = jsonData;

test("Login with New Credentials", async ({ page }) => {
  await page.goto("/");

  const login = new LoginPage(page);

  await login.doLogin(latestUserData.email, latestUserData.password);

  await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 20000 });
});
