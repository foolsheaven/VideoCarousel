import { useState, useEffect, useRef } from "react";
import NaviButton from "./NaviButton/NaviButton";
import "./Carousel.css";

let count = 0;
let pagingIntervall;

const Carousel = (props) => {
  const {
    intervall = 5000,
    data = [{ name: "", description: "", poster: "", videoUrl: "" }],
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
    <div className="carousel">
      <ul class="slider">
      {data.map((x, index) => (
        <li>
          <input type="radio" id={`Video${index}`} name="slide" checked />
          <label for={`Video${index}`}></label>
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
        </li>
        ))}
      </ul>

      {/* {data.map((x, index) => (
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
          ))} */}

      {/* <ul class="slider">
          <li>
            <input type="radio" id="slide1" name="slide" checked />
            <label for="slide1"></label>
            <img
              src="https://dribbble.s3.amazonaws.com/users/322/screenshots/872485/coldchase.jpg"

              alt="Panel 1"
            />
          </li>
          <li>
            <input type="radio" id="slide2" name="slide" />
            <label for="slide2"></label>
            <img
              src="https://dribbble.s3.amazonaws.com/users/322/screenshots/980517/icehut_sm.jpg"
              alt="Panel 2"
            />
          </li>
          <li>
            <input type="radio" id="slide3" name="slide" />
            <img
              src="https://dribbble.s3.amazonaws.com/users/322/screenshots/943660/hq_sm.jpg"
              alt="Panel 3"
            />
          </li>
          <li>
            <a href="http://cssslider.com/">
              <input type="radio" id="slide4" name="slide" />
              <img
                src="https://dribbble.s3.amazonaws.com/users/322/screenshots/599584/home.jpg"
                alt="Panel 4"
              />
            </a>
          </li>
        </ul> */}

      {/* <NaviButton color="white" direction="right" className="arrow arrow-next" />
         <NaviButton color="white" direction="left" className="arrow arrow-prev"/>        */}

      {/* <div className="clsButton">
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
        </div> */}

      {/* <div class="carousel-wrapper">
  <span id="item-1"></span>
  <span id="item-2"></span>
  <span id="item-3"></span>
  <div class="carousel-item item-1">
    <h2>Item 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus   accumsan pretium dolor vel convallis. Aliquam erat volutpat. Maecenas lacus nunc, imperdiet sed mi et, finibus suscipit mi.</p>
    <a class="arrow arrow-prev" href="#item-3"></a>
    <a class="arrow arrow-next" href="#item-2"></a>
  </div>
  
  <div class="carousel-item item-2">
    <h2>Item 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan pretium dolor vel convallis. Aliquam erat volutpat.</p>
    <a class="arrow arrow-prev" href="#item-1"></a>
    <a class="arrow arrow-next" href="#item-3"></a>
  </div>
  
  <div class="carousel-item item-3">
    <h2>Item 3</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus accumsan pretium dolor vel convallis. Aliquam erat volutpat.</p>
    <a class="arrow arrow-prev" href="#item-2"></a>
    <a class="arrow arrow-next" href="#item-1"></a>
  </div>
</div> */}

      {showInfoButton && (
        <div className="clsInfoButton" onClick={() => setShowInfo(true)}>
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
        </div>
      )}
    </div>
  );
};
export default Carousel;
