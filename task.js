const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { uploadVideo } = require("./uploader");

const root = __dirname;
const videosDir = path.join(root, "videos");
const workDir = path.join(root, "work");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit"
  });

  if (result.error) throw result.error;

  if (result.status !== 0) {
    throw new Error(command + " failed with code " + result.status);
  }
}

function makeVideo() {
  fs.mkdirSync(videosDir, { recursive: true });
  fs.mkdirSync(workDir, { recursive: true });

  const scenes = [
    "Jab mummy bole: Phone band karo!",
    "Beta: Bas 2 minute mummy!",
    "Mummy: 2 minute se 2 ghante ho gaye!",
    "Beta: Mummy phone ki battery hi khatam thi!",
    "Mummy: To charger kisne lagaya hai?"
  ];

  const filters = [
    "drawbox=x=35:y=170:w=650:h=940:color=black@0.45:t=fill"
  ];

  scenes.forEach((scene, index) => {
    const textFile = path.join(workDir, "scene" + index + ".txt");

    fs.writeFileSync(textFile, scene, "utf8");

    const safePath = textFile
      .replace(/\\/g, "/")
      .replace(/:/g, "\\:");

    filters.push(
      "drawtext=font='DejaVu Sans':textfile='" + safePath +
      "':fontcolor=white:fontsize=42:x=(w-text_w)/2:y=(h-text_h)/2:" +
      "enable='between(t," + (index * 4) + "," + ((index + 1) * 4) + ")'"
    );
  });

  const output = path.join(videosDir, "comedy_short.mp4");

  run("ffmpeg", [
    "-y",
    "-f", "lavfi",
    "-i", "color=c=0x26345c:s=720x1280:r=25:d=20",
    "-f", "lavfi",
    "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-vf", filters.join(","),
    "-c:v", "libx264",
    "-preset", "ultrafast",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "96k",
    "-shortest",
    output
  ]);

  if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
    throw new Error("Video file create nahi hui");
  }

  console.log("Video created:", output);

  return output;
}

async function main() {
  const videoPath = makeVideo();

  const title = "Mummy vs Mobile 😂 | Hindi Comedy Shorts";
  const description =
    "Mummy aur mobile ki funny nok-jhok 😂\n\n" +
    "#Comedy #HindiComedy #Shorts";

  const tags = [
    "Hindi comedy",
    "Funny video",
    "Mummy comedy",
    "Indian comedy",
    "Shorts"
  ];

  console.log("Video upload process starting...");

  await uploadVideo(
    videoPath,
    title,
    description,
    tags
  );

  console.log("AUTOMATION COMPLETE");
}

main().catch((error) => {
  console.error("AUTOMATION ERROR:", error.message);
  process.exitCode = 1;
});
