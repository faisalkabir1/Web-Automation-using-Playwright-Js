// @ts-check
// @ts-check
import { test, expect } from "@playwright/test";
import ResetPasswordPage from "../pages/ResetPasswordPage.js";
import fs from "fs";
import jsonData from "../resources/userData.json" assert { type: "json" };
const latestUserData = jsonData[jsonData.length - 1];

test.describe("Reset Password Flow", () => {
  let resetPage;

  test.beforeEach(async ({ page, request }) => {
    await page.goto("/");
    resetPage = new ResetPasswordPage(page, request);
  });

  test("Reset with Unregistered Email", async () => {
    await resetPage.linkResetPassword.click();
    await resetPage.resetWithUnregisteredEmail("abcd1234@gmail.com");
  });

  test("Reset with Invalid Email Format", async () => {
    await resetPage.linkResetPassword.click();
    await resetPage.resetWithInvalidEmail("abcd1234@@gmail..com");
    const isValid = await resetPage.isEmailValidInput();
    expect(isValid).toBeFalsy();
  });

  test("Reset with Registered Email and Save New Password", async () => {
    await resetPage.linkResetPassword.click();
    const newPass = await resetPage.resetWithValidEmail(latestUserData.email);
  });
});
