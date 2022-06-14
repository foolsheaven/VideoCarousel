import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Carousel from './Carousel'

const GOOGLE_API_READ_ALL_FROM_BUCKET = "https://storage.googleapis.com/storage/v1/b/bucket-video-content/o"
const GOOGLE_API_OPENFILE_FROM_BUCKET = "https://storage.googleapis.com/bucket-video-content"

function App() {
  const [media, setMedia] = useState([]);
  
  const fetchMoviesHandler = useCallback(async () => {
    try {
      const response = await fetch(GOOGLE_API_READ_ALL_FROM_BUCKET);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      data.items.forEach((x) => {
        if (x.contentType === "video/mp4") {
          const url = GOOGLE_API_OPENFILE_FROM_BUCKET + "/" + x.name
          setMedia((media) => [...media, {name: "", description: x.name, poster:"", videoUrl: url}]);
          console.log( {name: "", description: x.name, poster:"", videoUrl: url});
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler()
   }, [fetchMoviesHandler]);

  return (
    <div className="App">
      <Carousel data={media} intervall={8000} showInfoButton={true}/>
    </div>
  )
}

export default App;