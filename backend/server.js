const express = require("express")
const cors = require("cors")
const ytdl = require("ytdl-core")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/download", async (req, res) => {
  const { url } = req.body
  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid URL" })
  }

  try {
    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { quality: "highest" })
    res.json({ link: format.url })
  } catch (err) {
    res.status(500).json({ error: "Failed to get video" })
  }
})

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})
