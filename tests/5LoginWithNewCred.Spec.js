// @ts-check
import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import jsonData from "../resources/Updatedcredentials.json";
import jsonData2 from "../resources/userData.json";

test("Login with New Credentials", async ({ page }) => {
  await page.goto("/");
  const latestUserData = jsonData;
  const login = new LoginPage(page);

  await login.doLogin(latestUserData.email, latestUserData.password);

  await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 30000 });
});

test("Try to Login with Old Credentials", async ({ page }) => {
  await page.goto("/");

  const PreviousUserCred = jsonData2[jsonData2.length - 1];
  const login = new LoginPage(page);
  await login.doLogin(PreviousUserCred.email, PreviousUserCred.password);
  await expect(page.getByRole("paragraph")).toContainText(
    "Invalid email or password"
  );
});
