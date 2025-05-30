// @ts-check
import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import RegistrationPage from "../pages/RegistrationPage";
import jsonData from "../resources/userData.json";
import fs from "fs";
import dotenv from "dotenv";
import getLatestGmailSnippet from "../utils/gmailUtils";
dotenv.config();

test("User registration by providing all info", async ({ page }) => {
  await page.goto("/");

  const reg = new RegistrationPage(page);
  const randomNumber = faker.number.int({ min: 1000, max: 9999 });
  const userModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `fkkabir70+${randomNumber}@gmail.com`,
    password: faker.internet.password(),
    phoneNumber: `+8801${faker.number.int({ min: 100000000, max: 999999999 })}`,
    address: faker.location.street(),
  };

  await reg.registerUser(userModel);

  // Toast message assertion
  const toast = page.locator(".Toastify__toast");
  toast.waitFor({ timeout: 20000 });
  await expect(toast).toContainText("registered successfully!");

  jsonData.push(userModel);
  fs.writeFileSync(
    "./resources/userData.json",
    JSON.stringify(jsonData, null, 2)
  );
  await page.waitForTimeout(3000); // waits for 3 seconds
});

//Email Assertion

const apiURL = "https://gmail.googleapis.com";
const token = process.env.TOKEN;
test("Get latest email and assert the registration successful message", async ({
  request,
}) => {
  const latestMail = await getLatestGmailSnippet(request);
  expect(latestMail).toContain("Welcome to our platform");
});
