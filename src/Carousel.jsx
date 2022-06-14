import { useState, useEffect, useRef } from "react";
import "./Carousel.css";

let count = 0;
let pagingIntervall;

const Carousel = (props) => {
  const {
    intervall = 5000,
    data = [{name: "", description: "", poster: "", videoUrl: ""}],
    showInfoButton = false,
  } = props;

  const videoRef = useRef([]);

  const [curIndex, setCurIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const onClickNext = () => {
    count = (count + 1) % data.length;
    setCurIndex(count);
  };

  const onClickPrev = () => {
    count = (curIndex + data.length - 1) % data.length;
    setCurIndex(count);
  };

  const pausePaging = () => {
    console.log("Paging Stopped");
    clearInterval(pagingIntervall);
  };

  useEffect(() => {
    if (data.length !== 0) {
      pagingIntervall = setInterval(() => {
        onClickNext();
      }, props.intervall);
    } else {
      console.log("[Error] Data property has no element!");
    }
  }, [data, intervall]);

  const pauseVideo = () => {
    for (let index = 0; index < data.length; index++) {
      videoRef.current[index].pause();
    }
  };

  return (
    <div className="cslContainer">
      <div className="clsInterface">
        <div className="clsPlayer">
          {data.map((x, index) => (
            <div
              key={`Video${index}`}
              className={index === curIndex ? `clsActive` : `clsInactive`}
            >
              <div>
                <video
                  ref={(el) => (videoRef.current[index] = el)}
                  width="100%"
                  height="auto"
                  controls
                  poster={x.poster}
                  onPlay={() => pausePaging()}
                  onClick={() => pausePaging()}
                >
                  <source src={x.videoUrl} type="video/mp4" />
                  <div>
                    Sorry, your browser doesn't support embedded videos.
                  </div>
                </video>
              </div>
              {showInfo && (
                <div
                  className="clsModalInfoBox"
                  onClick={() => setShowInfo(false)}
                >
                  <div className="clsText">
                    <p className="clsHeadline">Info</p>
                    <p className="clsBody">{x.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="clsButton">
          <button
            className="clsPagingLeft"
            onClick={() => {
              pausePaging();
              pauseVideo();
              onClickPrev();
            }}
          >
            <svg
              height="24"
              width="24"
              color="white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
          <button
            className="clsPagingRight"
            onClick={() => {
              pausePaging();
              pauseVideo();
              onClickNext();
            }}
          >
            <svg
              height="24"
              width="24"
              color="white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        </div>
       {showInfoButton && 
       (<div className="clsInfoButton" onClick={() => setShowInfo(true)}>
          <svg
            height="24px"
            width="24px"
            color="white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>)}
      </div>
    </div>
  );
};
export default Carousel;
