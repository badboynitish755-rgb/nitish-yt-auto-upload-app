const cron = require("node-cron"); const express = require("express"); const { generateShort } = require("./shortGenerator"); const { generateLong } = require("./longGenerator"); const { uploadVideo } = require("./uploader");
const app = express(); const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => { res.send("AI YouTube Automation Running 🚀"); });
app.listen(PORT, () => { console.log("Server Running on port " + PORT); });
console.log("Scheduler Started...");
// 🟣 SHORT - 9 AM IST (3:30 UTC) cron.schedule("30 3 * * *", async () => { console.log("Generating SHORT..."); const filePath = await generateShort(); await uploadVideo(filePath, "short"); });
// 🔵 LONG - 6 PM IST (12:30 UTC) cron.schedule("30 12 * * *", async () => { console.log("Generating LONG..."); const filePath = await generateLong(); await uploadVideo(filePath, "long"); });