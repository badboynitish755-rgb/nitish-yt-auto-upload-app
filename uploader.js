const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

async function uploadVideo(filePath, title, description, tags = []) {
  if (!fs.existsSync(filePath)) {
    throw new Error("Video file not found: " + filePath);
  }

  const {
    YOUTUBE_CLIENT_ID,
    YOUTUBE_CLIENT_SECRET,
    YOUTUBE_REFRESH_TOKEN
  } = process.env;

  if (
    !YOUTUBE_CLIENT_ID ||
    !YOUTUBE_CLIENT_SECRET ||
    !YOUTUBE_REFRESH_TOKEN
  ) {
    throw new Error("YouTube GitHub Secrets are missing.");
  }

  const auth = new google.auth.OAuth2(
    YOUTUBE_CLIENT_ID,
    YOUTUBE_CLIENT_SECRET
  );

  auth.setCredentials({
    refresh_token: YOUTUBE_REFRESH_TOKEN
  });

  const youtube = google.youtube({
    version: "v3",
    auth
  });

  console.log("Starting PUBLIC YouTube upload...");

  const response = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: String(title).slice(0, 100),
        description: String(description).slice(0, 5000),
        tags: tags.slice(0, 15),
        categoryId: "23"
      },
      status: {
        privacyStatus: "public",
        selfDeclaredMadeForKids: true
      }
    },
    media: {
      body: fs.createReadStream(path.resolve(filePath))
    }
  });

  console.log("PUBLIC Upload successful!");
  console.log("Video ID:", response.data.id);
  console.log(
    "Video URL: https://www.youtube.com/watch?v=" +
    response.data.id
  );

  return response.data;
}

module.exports = { uploadVideo };
