import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"

const app = express()

app.use(cors())
app.use(express.json())

app.post('/download', async (req, res) => {
    const videoURL = req.body.url

    if (!ytdl.validateURL(videoURL)) {
        return res.status(400).json({ error: "Invalid YouTube URL" })
    }

    try {
        const info = await ytdl.getInfo(videoURL)
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, "")
        res.header("Content-Disposition", `attachment; filename="${title}.mp4"`)

        ytdl(videoURL, { format: "mp4"}).pipe(res);
    } catch (err) {
        res.status(500).json({ error: "Failed to donwload video "})
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))