const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/", (req, res) => {
  res.send("AI Shorts Automation Running 🚀");
});

// Tumhara script background me run hoga
exec("node daily_auto_shorts.js");

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});