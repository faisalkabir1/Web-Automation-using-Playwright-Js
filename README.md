# 🧪 DailyFinance End-to-End Automation Project

This project automates the core user flows of [DailyFinance](https://dailyfinance.roadtocareer.net/) using **Playwright**.

## 🔍 Test Flow Description

1. **User Registration**
   - Navigate to [https://dailyfinance.roadtocareer.net/](https://dailyfinance.roadtocareer.net/)
   - Register a new user using Faker-generated data
   - Assert:
     - Registration **toast message** appears
     - Welcome **email** is received using Gmail API

2. **Login & Add Items**
   - Login with the newly registered user
   - Add **2 random items**
   - Assert that **both items** appear in the item list

3. **Profile Update**
   - Go to **Profile Settings**
   - Upload a **profile photo**
   - Logout

4. **Password Reset**
   - From the Login page, click on **"Reset it here"**
   - Reset password using email link fetched via Gmail API
   - Save new password to `userData.json`

5. **Final Login**
   - Login with the new password
   - Assert that **login is successful**

---

## ❌ Negative Test Cases

- Try to User Login with **Invalid credential**
- Try to Reset password with **Unregistered email**
- Try Reset password with **Invalid email format**, Email input field validation via `checkValidity()`
- Try to Login with **Old Credentials**

### 🔗 View Test Cases: [Click here..](https://docs.google.com/spreadsheets/d/11C8W0Xy9B5GBr3FXRnxQrLAFq3vI46Ps/edit?usp=sharing&ouid=110591976413796555813&rtpof=true&sd=true)

## 📊 Test Reports

### ✅ Allure Report
![image](https://github.com/user-attachments/assets/0c7539ff-8357-487b-bbec-dde3821b82b6)
![image](https://github.com/user-attachments/assets/8a44901b-0455-49ee-b7ef-ef57eafaacc3)

---

## 🎥 Demo Recording

📺 **Watch the Automation Demo:**  
>

https://github.com/user-attachments/assets/146adc5a-42be-4dbb-abff-f3c50246cc76


---
## 🚀 How to Run This Project

Follow these steps to set up and run the project locally:

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/faisalkabir1/Web-Automation-using-Playwright-Js.git

cd Web-Automation-using-Playwright-Js
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and add your Gmail API token:
```env
TOKEN=your_google_api_token_here
```

#### 4️⃣ Run the Tests  
You can run all tests using Playwright Test:
```bash
npx playwright test
```

#### 5️⃣ View Allure Report (optional)  
Generate and open Allure report:
```bash
npx allure generate allure-results --clean -o allure-report

npx allure open allure-report
```

---
## 🛠 Tech Stack

| Tool        | Purpose                                 |
|-------------|------------------------------------------|
| Playwright  | End-to-end browser automation testing    |
| Faker.js    | Random test data generation              |
| Mochawesome | HTML test report for Mocha               |
| dotenv      | Managing environment variables           |
| Allure      | Advanced test report visualization       |
| Gmail API   | Reading password reset email             |


---

## 📁 .gitignore

```gitignore
# Dependencies
node_modules/

# Environment Config
.env

# Reports
allure-results/
allure-report/
```
## 🤝 Contribution

We welcome contributions from the community to improve this project! To contribute:

### 🧩 Guidelines

- Ensure your code follows existing style and patterns.
- Write clear, concise commit messages.
- Add tests for any new functionality.
- Update documentation if necessary.

### 🛠️ Contribution Steps

```bash
# 1. Fork the repository
# 2. Clone your forked repo
git clone https://github.com/your-username/your-forked-repo.git
cd your-forked-repo

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes and commit
git commit -m "Add: Your meaningful commit message"

# 5. Push your branch
git push origin feature/your-feature-name

# 6. Create a Pull Request to the main repository
```

Once your PR is reviewed and approved, it will be merged into the main branch. Thank you for your contributions! 🙌

