// server.js
import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const { videoURL } = req.body;

  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
    ytdl(videoURL, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).json({ error: "Failed to download video" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
