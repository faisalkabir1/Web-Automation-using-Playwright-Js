class AddItemPage {
  constructor(page) {
    this.page = page;

    this.addCostButton = page.locator(".add-cost-button");
    this.itemNameTxt = page.locator("#itemName");
    this.amountTxt = page.locator("#amount");
    this.quantityBtn = page.locator("button[type='button']").nth(2);
    this.purchaseDatePicker = page.locator("#purchaseDate");
    this.monthSelect = page.locator("#month");
    this.remarksTxt = page.locator("#remarks");
    this.submitBtn = page.locator("[type='submit']");
  }

  async addItem(item) {
    await this.addCostButton.click();
    await this.itemNameTxt.fill(item.itemName);
    await this.amountTxt.fill(item.amount);
    // await this.quantityBtn.click();
    // await this.quantityBtn.fill(item.quantity);
    await this.purchaseDatePicker.fill("");
    await this.purchaseDatePicker.fill(item.purchaseDate);
    await this.remarksTxt.fill(item.remarks);
    await this.submitBtn.click();
    await this.page.once("dialog", async (dialog) => await dialog.accept());
  }
}

export default AddItemPage;
