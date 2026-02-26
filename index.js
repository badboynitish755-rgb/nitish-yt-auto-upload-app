const express = require("express");

const app = express();

// Important for Render
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🔥 Your Render app is working perfectly!");
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});