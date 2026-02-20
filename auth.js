require("dotenv").config();
const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube"
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent"
});

console.log("👉 Browser me ye URL open hoga:");
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("🔑 Browser se jo code mile wo yahan paste karo: ", (code) => {
  oauth2Client.getToken(code, (err, token) => {
    if (err) {
      console.error("❌ Token error:", err.message);
      return;
    }
    oauth2Client.setCredentials(token);
    fs.writeFileSync("token.json", JSON.stringify(token));
    console.log("✅ Token saved successfully (token.json)");
    rl.close();
  });
});