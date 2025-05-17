// @ts-check
import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';



test('User registration by providing all info', async ({ page }) => {
  await page.goto('/register'); // Replace with actual URL
  await page.click('text=Register');

  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const randomNumber = faker.number.int({min:1000, max:9999});
 const email = `fkkabir70+${randomNumber}@gmail.com`;
  const password = '1234';
 const randomPhone = `+8801${faker.number.int({ min: 100000000, max: 999999999 })}`;

  const address = faker.location.street();

  const inputs = await page.locator('input');
  await inputs.nth(0).fill(firstname);
  await inputs.nth(1).fill(lastname);
  await inputs.nth(2).fill(email);
  await inputs.nth(3).fill(password);
  await inputs.nth(4).fill(randomPhone);
  await inputs.nth(5).fill(address);
  await inputs.nth(6).check(); // gender selection
  await inputs.nth(8).check(); // accept terms

  await page.click('#register');

  // Toast message assertion
  const toast = page.locator('.Toastify__toast');
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText('registered successfully!');

});
