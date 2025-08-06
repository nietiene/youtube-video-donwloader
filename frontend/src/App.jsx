import { useState } from 'react'
import "./App.css"

function App() {
  const [url, setUrl] = useState("")

  const handleDownload = () => {
    if (!url) return alert("Please enter a valid youtube URL")
      // redirect to backend endpoint
      window.location.href = `http://localhost:5000/donwload/?url=${encodeURIComponent(url)}`
  }
  return (
    <div className='App'>
      <h1>Youtube Video Donwloader</h1>
      <input type="text"
       placeholder='Enter YouTube URL' 
       value={url}
       onChange={(e) => setUrl(e.target.value)}
       />

       <button onClick={handleDownload}>
         Download
       </button>
    </div>

  )
}

export default App
