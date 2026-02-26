require("dotenv").config();
const cron = require("node-cron");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

console.log("🚀 AI YouTube Automation Started");

// ===== Automation Code YAHI LIKHNA =====
function runAutomation() {
  console.log("🔥 Running Automation Task...");
  
  // Yaha apna actual upload logic likh
  // Example:
  console.log("Video Upload Done ✅");
}

// ===== CRON =====
cron.schedule("0 9 * * *", runAutomation, { timezone: "Asia/Kolkata" });
cron.schedule("0 15 * * *", runAutomation, { timezone: "Asia/Kolkata" });
cron.schedule("0 21 * * *", runAutomation, { timezone: "Asia/Kolkata" });

// ===== Health Route =====
app.get("/", (req, res) => {
  res.send("🔥 AI YouTube Automation Running Successfully!");
});

app.listen(PORT, () => {
  console.log(🌍 Server running on port ${PORT});
});