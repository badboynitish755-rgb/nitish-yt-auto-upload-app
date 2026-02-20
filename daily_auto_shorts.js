const { execSync } = require("child_process");

async function runDailyAIShort() {
  try {
    console.log("🚀 Daily AI Shorts started...");

    console.log("✍️ Generating AI Script...");
    execSync("node ai_script_generator.js", { stdio: "inherit" });

    console.log("🎙️ Generating Voice...");
    execSync("node voice_generator.js", { stdio: "inherit" });

    console.log("🖼️ Generating Images...");
    execSync("node image_generator.js", { stdio: "inherit" });

    console.log("🎬 Creating AI Video...");
    execSync("node video_generator.js", { stdio: "inherit" });

    console.log("📤 Uploading to YouTube...");
    execSync("node upload.js", { stdio: "inherit" });

    console.log("✅ AI SHORT COMPLETED & UPLOADED!");

  } catch (err) {
    console.error("❌ Daily AI Shorts failed:", err.message);
  }
}

runDailyAIShort();