import React, { Component } from "react";
import "./NaviButton.css";

const NaviButton = (props) => {


  const onClickButton = () => {};

    return (
      <div className={props.className}>
        <button
          className={props.direction === "right" ? "ButtonRight" : "ButtonLeft"}
          onClick={() => {
            onClickButton();
          }}
        >
          <svg
            height="20"
            width="20"
            color="white"
            viewBox="2 2 20 16"
            fill="none"
            stroke={props.color} 
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
        </button>
      </div>
    );
}
export default NaviButton;
