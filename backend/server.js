import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"

const app = express()

app.get('/download', async (req, res) => {
    const videoURL = req.query.url;

    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).json({ error: "Invalid Youtube URL" })
    }

    const videoID = ytdl.getURLVideoID(videoURL)
    const info = ytdl.getInfo(videoID)
    const title = (await info).videoDetails.title

    res.header("Content-Disposition", `attachment; filename=${title}.mp4`)

    ytdl(videoURL, {
        format: "mp4",
        quality: "highestvideo",
    }).pipe(res)
})

const PORT = 500
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))