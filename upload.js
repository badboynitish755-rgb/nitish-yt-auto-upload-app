require("dotenv").config();
const fs = require("fs");
const { google } = require("googleapis");

// OAuth
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Token load
const token = JSON.parse(fs.readFileSync("token.json"));
oauth2Client.setCredentials(token);

// YouTube API
const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client
});

async function uploadVideo() {
  try {
    const videoPath = "final_video.mp4"; // ✅ AI GENERATED VIDEO

    if (!fs.existsSync(videoPath)) {
      console.log("❌ final_video.mp4 nahi mila");
      return;
    }

    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: "AI Shorts 🤖🔥",
          description: "Daily AI auto generated shorts",
          tags: ["ai shorts", "automation", "youtube shorts"],
          categoryId: "22"
        },
        status: {
          privacyStatus: "public",
          selfDeclaredMadeForKids: false
        }
      },
      media: {
        body: fs.createReadStream(videoPath)
      }
    });

    console.log("🎉 AI VIDEO UPLOADED!");
    console.log("Video ID:", response.data.id);

  } catch (err) {
    console.error("❌ Upload error:", err.message);
  }
}

uploadVideo();