// @ts-check
import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import RegistrationPage from "../pages/RegistrationPage";
import jsonData from "../utils/userData.json";
import fs from "fs";

test.only("User registration by providing all info", async ({ page }) => {
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
  fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));
});

//Email Assertion

const apiURL = "https://gmail.googleapis.com";
const token =
  "ya29.a0AW4XtxgQCjdwj9PZXP8k4C8OPqmg-DbMqcQJ-fI4Rl16CoPyNIQ9qGL7D5odpi0-FgFXshdB4jfDfU1_nIKYeutqT8nxEAtpQvEBjZWwXMr_fEtjZ-_NwU0mcuM3MG9IeW4nUx2UrwgO82JUTUQWAd928VjoZ1GV40CyHPC4aCgYKAakSARISFQHGX2MidhtDi6i7diq0p1fA5znB_w0175";
test("Get latest email and assert the registration successful message", async ({
  request,
}) => {
  const response1 = await request.get(apiURL + "/gmail/v1/users/me/messages/", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response1.json();
  const emailID = data.messages[0].id;

  const response2 = await request.get(
    apiURL + "/gmail/v1/users/me/messages/" + emailID,
    {
      headers: {
        Accept: "*/*",
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const resJson = await response2.json();
  const latestMail = resJson.snippet;
  expect(latestMail).toContain("Welcome to our platform");
});
