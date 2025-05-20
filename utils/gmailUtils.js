// utils/gmailUtils.js

require("dotenv").config();

const apiURL = "https://gmail.googleapis.com";
const token = process.env.TOKEN;

/**
 * Fetches the latest Gmail snippet.
 * @param {object} request - Playwright request context.
 * @returns {Promise<string>} - Latest email snippet text.
 */
async function getLatestGmailSnippet(request) {
  const response1 = await request.get(`${apiURL}/gmail/v1/users/me/messages/`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response1.json();
  const emailID = data.messages[0].id;

  const response2 = await request.get(
    `${apiURL}/gmail/v1/users/me/messages/${emailID}`,
    {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resJson = await response2.json();
  return resJson.snippet;
}

module.exports = { getLatestGmailSnippet };
