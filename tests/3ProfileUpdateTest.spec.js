// @ts-check
import { test, expect } from "@playwright/test";
import ProfilePage from "../pages/ProfilePage";
import jsonData from "../resources/userData.json";
import LoginPage from "../pages/LoginPage";

test("Go to profile settings and upload a profile photo and logout", async ({
  page,
}) => {
  await page.goto("/");

  const latestUser = jsonData[jsonData.length - 1];

  const login = new LoginPage(page);
  const profile = new ProfilePage(page);
  await login.doLogin(latestUser.email, latestUser.password);

  await profile.updateProfilePic("resources/profilepic.png");

  // Logout
  await profile.logout();
});
