require("dotenv").config();
const cron = require("node-cron");
const { exec } = require("child_process");

console.log("🚀 AI YouTube Automation Started (Cloud Mode)");

// Function to generate + upload video
function runAutomation() {
  console.log("⏳ Running AI Video Automation...");

  exec("node index.js", (error, stdout, stderr) => {
    if (error) {
      console.error(❌ Error: ${error.message});
      return;
    }
    if (stderr) {
      console.error(⚠️ Stderr: ${stderr});
      return;
    }
    console.log(✅ Success:\n${stdout});
  });
}

// 🕘 9 AM
cron.schedule("0 9 * * *", () => {
  console.log("🕘 9 AM Upload Triggered");
  runAutomation();
});

// 🕒 3 PM
cron.schedule("0 15 * * *", () => {
  console.log("🕒 3 PM Upload Triggered");
  runAutomation();
});

// 🕘 9 PM
cron.schedule("0 21 * * *", () => {
  console.log("🕘 9 PM Upload Triggered");
  runAutomation();
});

console.log("📅 Scheduler Running...");