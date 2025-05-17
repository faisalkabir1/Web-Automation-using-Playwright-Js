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
 //Email Assertion

  const apiURL = "https://gmail.googleapis.com";
  const token = "ya29.a0AW4XtxgQCjdwj9PZXP8k4C8OPqmg-DbMqcQJ-fI4Rl16CoPyNIQ9qGL7D5odpi0-FgFXshdB4jfDfU1_nIKYeutqT8nxEAtpQvEBjZWwXMr_fEtjZ-_NwU0mcuM3MG9IeW4nUx2UrwgO82JUTUQWAd928VjoZ1GV40CyHPC4aCgYKAakSARISFQHGX2MidhtDi6i7diq0p1fA5znB_w0175";
test.only('Get latest email and assert the registration successful message' , async ({request}) => {
  const response1 = await request.get(apiURL+"/gmail/v1/users/me/messages/",{
 headers :{
  "Accept" : "application/json",
  "Authorization" : "Bearer "+token
 }
});
const data = await response1.json();
const emailID = data.messages[0].id;

const response2 = await request.get( apiURL+"/gmail/v1/users/me/messages/"+emailID,{
 headers :{
  "Accept" : "*/*",
  "Content-type" : "application/json",
  "Authorization" : "Bearer "+token
 }
});
const resJson = await response2.json();
const latestMail = resJson.snippet;
expect(latestMail).toContain("Welcome to our platform");
});
