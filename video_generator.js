const fs = require("fs");
const { execSync } = require("child_process");

const script = JSON.parse(fs.readFileSync("script_output.json", "utf8"));

if (!fs.existsSync("videos")) {
  fs.mkdirSync("videos");
}

function cleanText(t) {
  return t
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/:/g, "")
    .replace(/-/g, " ");
}

function makeVideo(text, output) {
  const txt = cleanText(text);

  console.log("🎬 Creating:", output);

  const cmd =
    "ffmpeg -y -f lavfi -i color=c=black:s=1280x720:d=5 " +
    "-vf \"drawtext=fontfile=C\\\\:/Windows/Fonts/arial.ttf:" +
    "text=" + txt +
    ":fontcolor=white:fontsize=36:" +
    "x=(w-text_w)/2:y=(h-text_h)/2\" " +
    "-c:v libx264 -t 5 -pix_fmt yuv420p " + output;

  execSync(cmd, { stdio: "inherit" });
}

for (let i = 0; i < script.short.scenes.length; i++) {
  makeVideo(
    script.short.scenes[i],
    "videos/short_scene" + (i + 1) + ".mp4"
  );
}

console.log("✅ ALL VIDEOS CREATED");