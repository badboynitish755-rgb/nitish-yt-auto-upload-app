const fs = require("fs");

if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

const script = JSON.parse(fs.readFileSync("script_output.json", "utf8"));

script.short.scenes.forEach(function (scene, index) {
  const content = "IMAGE PROMPT " + (index + 1) + "\n" + scene;
  fs.writeFileSync("images/short_image_" + (index + 1) + ".txt", content);
});

script.long.scenes.forEach(function (scene, index) {
  const content = "IMAGE PROMPT " + (index + 1) + "\n" + scene;
  fs.writeFileSync("images/long_image_" + (index + 1) + ".txt", content);
});

console.log("✅ Image prompts created");