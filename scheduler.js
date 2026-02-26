require("dotenv").config();
const cron = require("node-cron");
const { exec } = require("child_process");
const express = require("express");

const app = express();

// 🔥 Render Safe PORT
const PORT = process.env.PORT || 10000;

console.log("🚀 AI YouTube Automation Started (Cloud Mode)");

// ===============================
// ✅ Automation Runner
// ===============================
function runAutomation() {
  console.log("⏳ Running AI Video Automation...");

  exec("node index.js", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error:", error.message);
      return;
    }
    if (stderr) {
      console.error("⚠️ Stderr:", stderr);
      return;
    }
    console.log("✅ Success:\n", stdout);
  });
}

// ===============================
// ✅ CRON SCHEDULE (India Time)
// ===============================

// 9 AM
cron.schedule(
  "0 9 * * *",
  () => {
    console.log("🕘 9 AM Upload Triggered");
    runAutomation();
  },
  { timezone: "Asia/Kolkata" }
);

// 3 PM
cron.schedule(
  "0 15 * * *",
  () => {
    console.log("🕒 3 PM Upload Triggered");
    runAutomation();
  },
  { timezone: "Asia/Kolkata" }
);

// 9 PM
cron.schedule(
  "0 21 * * *",
  () => {
    console.log("🕘 9 PM Upload Triggered");
    runAutomation();
  },
  { timezone: "Asia/Kolkata" }
);

// ===============================
// ✅ Health Check Route
// ===============================
app.get("/", (req, res) => {
  res.send("🔥 AI YouTube Automation Running Successfully!");
});

// ===============================
// ✅ Start Server
// ===============================
app.listen(PORT, () => {
  console.log(🌍 Server running on port ${PORT});
  console.log("📅 Scheduler Running...");
});