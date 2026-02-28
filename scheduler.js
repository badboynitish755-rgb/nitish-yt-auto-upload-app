const express = require("express");
const cron = require("node-cron");

const app = express();

const PORT = process.env.PORT || 10000;

// Simple route so Render detect kare ki server running hai
app.get("/", (req, res) => {
  res.send("YouTube Auto Upload Scheduler Running");
});

// Cron job - har 1 minute me chalega (test ke liye)
cron.schedule("* * * * *", () => {
  console.log("Cron job is running...");
  
  // Yaha tum future me apna YouTube upload logic daal sakte ho
});

// Server start
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});