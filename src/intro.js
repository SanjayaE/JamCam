import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

class Intro extends React.Component {
  // …
  render() {
    return (
      <span>
        <h3>Instructions: </h3>
        <li>Grant access to your webcam </li>
        <li>
          Stand about 2 meters back so that the webcam can see your face and
          limbs{" "}
        </li>
        <li>
          Do your best dance moves, as your movements and likeness are
          ✨:magically✨ transferred to music.
        </li>
      </span>
    );
  }
}
export default Intro;
