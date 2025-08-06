import express from "express"
import cors from "cors"
import ytdl from "ytdl-core"

const app = express()

app.get('/download', async (req, res) => {
    const videoURL = req.query.url;

    if (!ytdl.validateURL(videoURL)) {
        return
    }
})