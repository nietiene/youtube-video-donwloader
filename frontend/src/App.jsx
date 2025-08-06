import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/download', { url })
      setDownloadUrl(res.data.link)
    } catch (err) {
      alert("Failed to fetch download link")
    }
    setLoading(false)
  }

  useEffect(() => {
    // Insert PropellerAds or other ad script
    const script = document.createElement('script')
    script.src = '//upgulpinon.com/1?z=YOUR_AD_ID'
    script.async = true
    document.getElementById('ad-container').appendChild(script)
  }, [])

  return (
    <div className="container">
      <h1>YouTube Downloader</h1>
      <input
        type="text"
        placeholder="Paste YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Processing...' : 'Get Download Link'}
      </button>

      {downloadUrl && (
        <div className="result">
          <a href={downloadUrl} target="_blank">Download Video</a>
        </div>
      )}

      <div id="ad-container" style={{ marginTop: '40px' }}></div>
    </div>
  )
}

export default App
