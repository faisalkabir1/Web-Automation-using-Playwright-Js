// @ts-check
import { test, expect } from "@playwright/test";
import jsonData from "../resources/userData.json";
import LoginPage from "../pages/LoginPage";

import { faker } from "@faker-js/faker";
import fs from "fs";
import AddItemPage from "../pages/AddItemPage";

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
let addedItems = [];
test("Newly created user login and add items", async ({ page }) => {
  await page.goto("/");

  const latestUser = jsonData[jsonData.length - 1];

  const login = new LoginPage(page);
  const add = new AddItemPage(page);

  await login.doLogin(latestUser.email, latestUser.password);

  await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 20000 });
  // await page.pause();
  for (let i = 0; i < 2; i++) {
    const item = {
      itemName: faker.commerce.productName(),
      amount: faker.commerce.price({ min: 10, max: 1000 }),
      quantity: "1",
      purchaseDate: "2026-05-10",
      month: "5",
      remarks: faker.lorem.words(2),
    };

    addedItems.push(item);
    await add.addItem(item);
    await page.waitForTimeout(1000);
  }

  // Save added items to JSON
  fs.writeFileSync(
    "./resources/addedItems.json",
    JSON.stringify(addedItems, null, 2)
  );

  // Accept alert if shown
  page.on("dialog", async (dialog) => await dialog.accept());

  // Assertion after waiting for table to load
  await page.waitForTimeout(3000);
  const rows = await page.locator("tr").allTextContents();

  expect(rows.length).toBeGreaterThanOrEqual(3); // 1 header + 2 items
  expect(rows[1]).toContain(addedItems[0].itemName);
  expect(rows[2]).toContain(addedItems[1].itemName);
});
