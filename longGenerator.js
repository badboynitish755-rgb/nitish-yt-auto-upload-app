const fs = require("fs");
async function generateLong() { console.log("Creating Long Video...");
const filePath = "./output/long.mp4";
// Dummy video create simulation fs.writeFileSync(filePath, "Long Video Data");
console.log("Long Video Created"); return filePath; }
module.exports = { generateLong };