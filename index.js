const express = require("express");
require("./scheduler");

const app = express();

app.get("/", (req, res) => {
  res.send("Nitish Background Automation Running");
});

app.listen(9875, () => {
  console.log("🚀 Server running on http://localhost:9875");
});