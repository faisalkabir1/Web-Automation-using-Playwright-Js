class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailTxt = page.getByRole("textbox", { name: "Email" });
    this.passwordTxt = page.getByRole("textbox", { name: "Password" });
    this.loginBtn = page.getByRole("button", { name: "LOGIN" });
  }

  async doLogin(email, password) {
    await this.emailTxt.fill(email);
    await this.passwordTxt.fill(password);
    await this.loginBtn.click();
  }
}

export default LoginPage;
