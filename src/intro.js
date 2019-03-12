import React, { Component } from "react";
import backgroundImage from "./img/90s2.png";

class Intro extends React.Component {
  // …
  render() {
    return (
      <div id="main">
        <div class="text_container">
          <div class="text">
            <h3>Instructions: </h3>
            <p>Grant access to your webcam </p>
            <p>
              Stand about 2 meters back so that the webcam can see your face and
          limbs.
            </p>
            <p>
              Do your best dance moves, as your movements are
              ✨magically✨ transferred to music.
            </p>
            <a href="/app"><button id="start_button" type="button">Start Jamming</button></a>
          </div>
        </div>
        <div class="img_container">
          <img class="logo_img" src={backgroundImage} alt="90s_baby" />
        </div>
      </div>
    );
  }
}
export default Intro;
