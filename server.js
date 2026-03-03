const express = require("express"); const cron = require("node-cron");
const app = express();
// ✅ Root route (UptimeRobot ke liye) app.get("/", (req, res) => { res.status(200).send("AI Shorts Automation Running 🚀"); });
// ✅ 9 AM Short cron.schedule("0 9 * * *", () => { console.log("9 AM Short Upload Triggered"); require("./daily_auto_shorts.js"); }, { timezone: "Asia/Kolkata" });
// ✅ 6 PM Long Video cron.schedule("0 18 * * *", () => { console.log("6 PM Long Upload Triggered"); require("./daily_auto_long.js"); }, { timezone: "Asia/Kolkata" });
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => { console.log("Server running on port " + PORT); });