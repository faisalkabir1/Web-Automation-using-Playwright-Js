import { expect } from "@playwright/test";
import getLatestGmailSnippet from "../utils/gmailUtils.js";
import fs from "fs";
import { faker } from "@faker-js/faker";

class ResetPasswordPage {
  constructor(page, request) {
    this.page = page;
    this.request = request;

    // Selectors
    this.linkResetPassword = page.locator("a[href='/forgot-password']");
    this.txtEmail = page.locator("input[type='email']");
    this.btnSendReset = page.locator("button[type='submit']");
    this.txtInformation = page.locator("p");
    this.txtNewPassword = page.locator("input");
    this.btnResetPass = page.locator("button[type='submit']");
  }

  async reliableClear(locator) {
    await locator.click();
    await locator.fill("");
    await this.page.evaluate(
      (el) => (el.value = ""),
      await locator.elementHandle()
    );
    const val = await locator.inputValue();
    if (val !== "") throw new Error(`Input not cleared. Value: ${val}`);
  }

  async resetWithValidEmail(userEmail) {
    await this.reliableClear(this.txtEmail);
    await this.txtEmail.fill(userEmail);
    await this.btnSendReset.click();
    await this.txtInformation.waitFor();

    // Wait and fetch Gmail
    await this.page.waitForTimeout(4000);
    const snippet = await getLatestGmailSnippet(this.request);
    const resetPassLink = snippet.split(": ")[1].trim();
    await this.page.goto(resetPassLink);

    // Generate new password
    const newPass = faker.internet.password({ length: 8 });

    await this.txtNewPassword.nth(0).fill(newPass);
    await this.page.waitForTimeout(1000);
    await this.txtNewPassword.nth(1).fill(newPass);
    await this.btnResetPass.click();
    await this.page.waitForTimeout(1000);

    await expect(this.txtInformation).toBeVisible({ timeout: 5000 });
    const msg = await this.txtInformation.textContent();
    expect(msg).toContain("Password reset successfully");

    // Save to JSON file
    const data = { email: userEmail, password: newPass };
    fs.writeFileSync(
      "./resources/Updatedcredentials.json",
      JSON.stringify(data, null, 2)
    );

    return newPass;
  }

  async resetWithUnregisteredEmail(userEmail) {
    await this.reliableClear(this.txtEmail);
    await this.txtEmail.fill(userEmail);
    await this.btnSendReset.click();
    await this.page.waitForTimeout(1000);
    const msg = await this.txtInformation.textContent();
    expect(msg).toContain("Your email is not registered");
  }

  async resetWithInvalidEmail(userEmail) {
    await this.reliableClear(this.txtEmail);
    await this.txtEmail.fill(userEmail);
    await this.btnSendReset.click();
    await this.page.waitForTimeout(1000);
  }

  async isEmailValidInput() {
    return await this.page.evaluate(
      (el) => el.checkValidity(),
      await this.txtEmail.elementHandle()
    );
  }
}

export default ResetPasswordPage;
