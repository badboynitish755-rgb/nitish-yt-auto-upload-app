const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const videoDir = "videos";
const voiceDir = "voices";
const syncedDir = "synced";
const finalOutput = "FINAL_VIDEO.mp4";

if (!fs.existsSync(syncedDir)) {
  fs.mkdirSync(syncedDir);
}

const videoFiles = fs
  .readdirSync(videoDir)
  .filter(f => f.endsWith(".mp4"))
  .sort();

console.log("🎬 Total scenes:", videoFiles.length);

videoFiles.forEach((video, i) => {
  const v = path.join(videoDir, video);
  const a = path.join(voiceDir, "scene" + (i + 1) + ".mp3");
  const out = path.join(syncedDir, "scene" + (i + 1) + ".mp4");

  if (!fs.existsSync(a)) {
    console.log("❌ Missing voice:", a);
    return;
  }

  console.log("🔗 Syncing:", out);

  execSync(
    'ffmpeg -y -i "' + v + '" -i "' + a + '" -c:v copy -c:a aac -shortest "' + out + '"',
    { stdio: "inherit" }
  );
});

const syncedFiles = fs
  .readdirSync(syncedDir)
  .filter(f => f.endsWith(".mp4"))
  .sort();

const listFile = "merge_list.txt";
fs.writeFileSync(
  listFile,
  syncedFiles.map(f => "file '" + path.join(syncedDir, f) + "'").join("\n")
);

console.log("🎞️ Merging all scenes...");

execSync(
  'ffmpeg -y -f concat -safe 0 -i ' + listFile + ' -c copy ' + finalOutput,
  { stdio: "inherit" }
);

fs.unlinkSync(listFile);

console.log("✅ FINAL VIDEO READY:", finalOutput);