const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { uploadVideo } = require("./uploader");

const ROOT = __dirname;
const VIDEOS = path.join(ROOT, "videos");
const WORK = path.join(ROOT, "work");

const STORIES = [
  {
    title: "Mummy Ka Smart Phone 😂 | Hindi Cartoon Comedy",
    scenes: [
      ["Mummy: Phone band karo!", "Beta: Bas ek minute Mummy!"],
      ["Mummy: Ek minute kab se ek ghanta ho gaya?", "Beta: Phone ki ghadi fast hai!"],
      ["Mummy: Achha? Toh homework bhi fast kar lo!", "Beta: Mummy, ab phone slow ho gaya!"],
      ["Mummy: Bahane banana band karo!", "Beta: Ji Mummy, phone bhi band!"],
      ["Mummy: Aur homework?", "Beta: Woh bhi kal se pakka! 😂"]
    ]
  },
  {
    title: "Chintu Ki Nayi Trick 😂 | Hindi Cartoon Comedy",
    scenes: [
      ["Papa: Chintu, homework hua?", "Chintu: Haan Papa, almost!"],
      ["Papa: Almost matlab?", "Chintu: Bas copy kholni baaki hai!"],
      ["Papa: Aur pencil?", "Chintu: Woh bhi homework karne gayi hai!"],
      ["Papa: Bahut smart ho!", "Chintu: Thank you Papa!"],
      ["Papa: Abhi baitho aur kaam karo!", "Chintu: Meri trick fail ho gayi! 😂"]
    ]
  },
  {
    title: "Goluu Aur Samosa 😂 | Hindi Cartoon Comedy",
    scenes: [
      ["Mummy: Goluu, samosa kisne khaya?", "Goluu: Mujhe nahi pata!"],
      ["Mummy: Tumhare muh par chutney hai!", "Goluu: Yeh toh face cream hai!"],
      ["Mummy: Aur plate khaali kyun hai?", "Goluu: Samosa chhutti par gaya!"],
      ["Mummy: Sach batao!", "Goluu: Achha, ek aur chahiye tha!"],
      ["Mummy: Pehle homework!", "Goluu: Samosa ka sapna toot gaya! 😂"]
    ]
  },
  {
    title: "Chintu Ka Alarm 😂 | Hindi Cartoon Comedy",
    scenes: [
      ["Mummy: Chintu, school ka time ho gaya!", "Chintu: Alarm nahi baja!"],
      ["Mummy: Alarm toh baj raha hai!", "Chintu: Woh mera nahi hai!"],
      ["Mummy: Phone tumhara hi hai!", "Chintu: Phone ko bhi neend aa rahi hai!"],
      ["Mummy: Jaldi taiyar ho!", "Chintu: Bas paanch minute!"],
      ["Mummy: Roz ka yahi drama!", "Chintu: Main toh artist hoon! 😂"]
    ]
  },
  {
    title: "Papa Aur Remote 😂 | Hindi Cartoon Comedy",
    scenes: [
      ["Papa: Remote kahan hai?", "Chintu: Mujhe nahi pata!"],
      ["Papa: TV tumne chalaya tha!", "Chintu: Haan, par remote gayab hai!"],
      ["Papa: Sofa ke paas dekho!", "Chintu: Wahan bhi nahi hai!"],
      ["Papa: Tumhare haath mein kya hai?", "Chintu: Arre! Remote!"],
      ["Papa: Wah bhai wah!", "Chintu: Remote mere saath hi tha! 😂"]
    ]
  }
];

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: "inherit"
  });

  if (result.error) throw result.error;

  if (result.status !== 0) {
    throw new Error(command + " failed with code " + result.status);
  }
}

function writeText(name, content) {
  const file = path.join(WORK, name);
  fs.writeFileSync(file, content, "utf8");
  return file.replace(/\\/g, "/").replace(/:/g, "\\:");
}

function makeStory() {
  const day = Math.floor(Date.now() / 86400000);
  return STORIES[day % STORIES.length];
}

function makeVideo(story) {
  fs.mkdirSync(VIDEOS, { recursive: true });
  fs.mkdirSync(WORK, { recursive: true });

  const narration = story.scenes
    .map(scene => scene.join(" "))
    .join(" ");

  const narrationFile = path.join(WORK, "narration.txt");
  const audioFile = path.join(WORK, "narration.wav");
  const output = path.join(VIDEOS, "comedy_short.mp4");

  fs.writeFileSync(narrationFile, narration, "utf8");

  console.log("Creating Hindi voiceover...");

  run("espeak-ng", [
    "-v", "hi",
    "-s", "145",
    "-a", "170",
    "-f", narrationFile,
    "-w", audioFile
  ]);

  const filters = [
    "drawbox=x=0:y=0:w=iw:h=ih:color=0x26345c:t=fill",
    "drawbox=x=0:y=950:w=iw:h=330:color=0x17213f:t=fill"
  ];

  story.scenes.forEach((scene, index) => {
    const start = index * 5;
    const end = start + 5;

    const first = writeText(
      "scene_" + index + "_a.txt",
      scene[0]
    );

    const second = writeText(
      "scene_" + index + "_b.txt",
      scene[1]
    );

    const enable = "between(t," + start + "," + end + ")";

    filters.push(
      "drawbox=x='mod(t*100,900)-150':y=650:w=130:h=210:color=0xffbd69:t=fill:enable='" + enable + "'"
    );

    filters.push(
      "drawbox=x='mod(t*100,900)-150':y=560:w=130:h=110:color=0xffdfad:t=fill:enable='" + enable + "'"
    );

    filters.push(
      "drawtext=font='DejaVu Sans':text='NITISH CARTOON':fontcolor=yellow:fontsize=35:x=(w-text_w)/2:y=90:enable='" + enable + "'"
    );

    filters.push(
      "drawtext=font='DejaVu Sans':textfile='" + first + "':fontcolor=white:fontsize=39:x=(w-text_w)/2:y=350:box=1:boxcolor=black@0.65:boxborderw=18:enable='" + enable + "'"
    );

    filters.push(
      "drawtext=font='DejaVu Sans':textfile='" + second + "':fontcolor=yellow:fontsize=35:x=(w-text_w)/2:y=470:box=1:boxcolor=black@0.65:boxborderw=18:enable='" + enable + "'"
    );

    filters.push(
      "drawtext=font='DejaVu Sans':text='Funny Hindi Comedy':fontcolor=white:fontsize=26:x=(w-text_w)/2:y=1120:enable='" + enable + "'"
    );
  });

  console.log("Creating animated cartoon-style video...");

  run("ffmpeg", [
    "-y",
    "-f", "lavfi",
    "-i", "color=c=0x26345c:s=720x1280:r=25:d=25",
    "-i", audioFile,
    "-vf", filters.join(","),
    "-af", "apad",
    "-t", "25",
    "-c:v", "libx264",
    "-preset", "ultrafast",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    output
  ]);

  if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
    throw new Error("Video create nahi hui");
  }

  console.log("Video created:", output);
  return output;
}

async function main() {
  const story = makeStory();
  const videoPath = makeVideo(story);

  const description =
    "Funny Hindi Cartoon Comedy 😂\n" +
    "Family-friendly comedy story for kids.\n\n" +
    "#HindiComedy #CartoonComedy #KidsComedy #Shorts";

  const tags = [
    "Hindi cartoon",
    "Kids comedy",
    "Hindi comedy",
    "Funny cartoon",
    "Family comedy",
    "Shorts"
  ];

  console.log("Starting YouTube upload...");

  await uploadVideo(
    videoPath,
    story.title,
    description,
    tags
  );

  console.log("AUTOMATION COMPLETE");
}

main().catch(error => {
  console.error("AUTOMATION ERROR:", error.message);
  process.exitCode = 1;
});
