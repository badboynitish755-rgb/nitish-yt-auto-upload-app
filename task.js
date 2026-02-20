const { execSync } = require("child_process");

module.exports = () => {
  console.log("🤖 FULL AUTOMATION STARTED...");

  try {
    console.log("🧠 Generating Script...");
    execSync("node ai_script_generator.js", { stdio: "inherit" });

    console.log("🖼️ Generating Images...");
    execSync("node image_generator.js", { stdio: "inherit" });

    console.log("🔊 Generating Voice...");
    execSync("node voice_generator.js", { stdio: "inherit" });

    console.log("🎬 Generating Video...");
    execSync("node video_generator.js", { stdio: "inherit" });

    console.log("📤 Uploading Video...");
    execSync("node upload.js", { stdio: "inherit" });

    console.log("✅ FULL AUTOMATION COMPLETE");
  } catch (err) {
    console.log("❌ Automation Error:", err.message);
  }
};