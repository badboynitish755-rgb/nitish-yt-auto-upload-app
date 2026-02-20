const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const videoDir = path.join(__dirname, "videos");

let files = fs.readdirSync(videoDir)
  .filter(function(f){ return f.endsWith(".mp4"); })
  .map(function(f){
    return "file '" + path.join(videoDir, f) + "'";
  })
  .join("\n");

fs.writeFileSync("videos/list.txt", files);

execSync(
  "ffmpeg -y -f concat -safe 0 -i videos/list.txt -c copy final_video.mp4",
  { stdio: "inherit" }
);

console.log("🔥 FINAL VIDEO READY: final_video.mp4");