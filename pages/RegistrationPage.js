class RegistrationPage {
  constructor(page) {
    this.page = page;

    this.registrationLink = page.getByRole("link", { name: "Register" });
    this.firstNameTxt = page.getByLabel("First Name");
    this.lastNameTxt = page.getByLabel("Last Name");
    this.emailTxt = page.getByLabel("Email");
    this.passwordTxt = page.getByLabel("Password");
    this.phoneNumberTxt = page.getByLabel("Phone Number");
    this.addressTxt = page.getByLabel("Address");
    this.genderRadioBtn = page.getByRole("radio");
    this.terms = page.getByRole("checkbox");
    this.registerBtn = page.getByRole("button", { name: "REGISTER" });
  }

  async registerUser(userModel) {
    await this.registrationLink.click();
    await this.firstNameTxt.fill(userModel.firstName);
    await this.lastNameTxt.fill(userModel.lastName);
    await this.emailTxt.fill(userModel.email);
    await this.passwordTxt.fill(userModel.password);
    await this.phoneNumberTxt.fill(userModel.phoneNumber);
    await this.addressTxt.fill(userModel.address);
    await this.genderRadioBtn.first().click();
    await this.terms.click();
    await this.registerBtn.click();
  }
}

export default RegistrationPage;
