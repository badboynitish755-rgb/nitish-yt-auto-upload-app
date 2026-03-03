const express = require("express"); const { exec } = require("child_process");
const app = express();
// ✅ Root route (IMPORTANT) app.get("/", (req, res) => { res.status(200).send("AI Shorts Automation Running 🚀"); });
// ✅ Server port const PORT = process.env.PORT || 10000;
app.listen(PORT, () => { console.log("Server running on port " + PORT); });
// ✅ Scheduler background me run hoga exec("node scheduler.js", (error, stdout, stderr) => { if (error) { console.log("Scheduler Error:", error.message); } if (stderr) { console.log("Scheduler Stderr:", stderr); } if (stdout) { console.log("Scheduler Output:", stdout); } });