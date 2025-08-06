import { useState } from 'react'
import "./App.css"
import axios from "axios"

function App() {
  const [url, setUrl] = useState("")

  const handleDownload = () => {
    if (!url) return alert("Please enter a valid youtube URL")

      try {
        const response = await axios.post(
          "http://localhost:5000/download", { url },
          {
            responseType: "blob"
          }
        )

        const blob = new Blob([response.data], { type: ""})
      }
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
