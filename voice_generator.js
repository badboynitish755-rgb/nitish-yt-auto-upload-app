const fs = require("fs");
const { execSync } = require("child_process");

const script = JSON.parse(fs.readFileSync("script_output.json", "utf8"));

if (!fs.existsSync("voices")) {
  fs.mkdirSync("voices");
}

for (let i = 0; i < script.short.scenes.length; i++) {
  const text = script.short.scenes[i];
  const out = "voices/scene" + (i + 1) + ".mp3";

  const cleanText = text
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/:/g, "")
    .replace(/-/g, " ");

  const cmd =
    "python -m edge_tts " +
    "-v hi-IN-MadhurNeural " +
    "-t \"" + cleanText + "\" " +
    "--write-media " + out;

  console.log("🎙️ Generating voice:", out);
  execSync(cmd, { stdio: "inherit" });
}

console.log("✅ ALL AI VOICES CREATED");