const express = require("express"); const { exec } = require("child_process");
const app = express();
// Root route (important for UptimeRobot) app.get("/", (req, res) => { res.status(200).send("AI Shorts Automation Running 🚀"); });
// Background script run exec("node daily_auto_shorts.js");
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => { console.log("Server running on port " + PORT); });