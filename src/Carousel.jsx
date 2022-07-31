import { useState, useEffect, useRef } from "react";
import NaviButton from "./NaviButton/NaviButton";
import "./Carousel.css";

let count = 0;
let pagingIntervall;

const Carousel = (props) => {
  const basicColor = "black";
  const highlightColor = "blue";

  const {
    data = [{ name: "", description: "", poster: "", videoUrl: "" }],
  } = props;

  const videoRef = useRef([]);
  const [showInfo, setShowInfo] = useState(true);

  const loaded = () => {
    console.log("Finished");
    setShowInfo(false);
    document.getElementById("Label0").style.backgroundColor = highlightColor;
    document.getElementById("Video0").checked = true;
    document.getElementById("Video0").style.visibility = "visible";
  };

  const clickInput = (value) => {
    for (let index = 0; index < data.length; index++) {
      videoRef.current[index].pause();
      document.getElementById("Label" + index).style.backgroundColor =
        basicColor;
      document.getElementById("Video" + index).style.visibility = "hidden";
    }
    document.getElementById("Label" + value).style.backgroundColor =
      highlightColor;
    document.getElementById("Video" + value).style.visibility = "visible";
  };

  return (
    <div className="carousel">
      <div className="slider">
        {data.map((x, index) => (
          <div key={index}>
            <video
              id={`Video${index}`}
              ref={(el) => (videoRef.current[index] = el)}
              width="100%"
              height="auto"
              controls
              // poster={x.poster}
              onClick={() => console.log("CLICK Video Nr. " + index)}
              onLoadedData={() => loaded()}
            >
              <source src={x.videoUrl} type="video/mp4" />
              <div>Sorry, your browser doesn't support embedded videos.</div>
            </video>

            <label
              id={`Label${index}`}
              onClick={() => clickInput(index)}
              style={{ left: `${1.5 * index + 0.8}em`, marginLeft: `${50 - 1.5*data.length }%` }}
            > </label>
          </div>
        ))}
      </div>
      {showInfo && <div className="clsLoading">Videos are loading ...</div>}
    </div>
  );
};
export default Carousel;
