class ProfilePage {
  constructor(page) {
    this.page = page;
    this.accountBtn = page.getByRole("button", {
      name: "account of current user",
    });
    this.profileMenu = page.getByRole("menuitem", { name: "Profile" });
    this.editBtn = page.getByRole("button", { name: "Edit" });
    this.chooseFileBtn = page.getByRole("button", { name: "Choose File" });
    this.uploadBtn = page.getByRole("button", { name: "Upload Image" });
    this.updateBtn = page.getByRole("button", { name: "Update" });
    this.logoutMenu = page.getByRole("menuitem", { name: "Logout" });
  }

  async updateProfilePic(imagePath) {
    await this.accountBtn.click();
    await this.profileMenu.click();
    await this.editBtn.click();

    await this.chooseFileBtn.setInputFiles(imagePath);
  }

  async logout() {
    await this.accountBtn.click();
    await this.logoutMenu.click();
  }
}

export default ProfilePage;
