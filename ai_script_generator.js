const fs = require("fs");

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const topicsShort = [
  "Mobile battery 1 percent panic",
  "OTP late drama",
  "Online class camera on",
  "Phone gir gaya slow motion"
];

const topicsLong = [
  "Indian parents vs mobile",
  "Shaadi free food hunters",
  "Gym join 2 din quit",
  "Relatives asking salary"
];

function generateScenes(topic, count) {
  const base = [
    "Funny entry",
    "Unexpected twist",
    "Overacting moment",
    "Emotional drama",
    "Ultimate funny ending"
  ];

  let scenes = [];

  for (let i = 0; i < count; i++) {
    scenes.push(topic + " - " + random(base));
  }

  return scenes;
}

const output = {
  short: {
    format: "SHORTS 9:16",
    topic: random(topicsShort),
    scenes: generateScenes("Short Comedy", 4)
  },
  long: {
    format: "LONG 16:9",
    topic: random(topicsLong),
    scenes: generateScenes("Long Comedy", 6)
  }
};

fs.writeFileSync("script_output.json", JSON.stringify(output, null, 2));

console.log("FREE REAL AI SCRIPT GENERATED");