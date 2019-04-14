import React, { Component } from "react";
import backgroundImage from "./img/site-background.jpg";

class Intro extends Component {
  // …
  render() {
    return (
      <div id="main">
        <div class="text_container">
          <div class="text">
            <h2>JamCam lets you control beats and sounds with your body, by just using your webcam. </h2>
            <br></br>
            <h3>Instructions: </h3>
            <p>Grant access to your webcam </p>
            <p>
              Stand about 3 meters back so that the webcam can see your face and
          limbs.
            </p>
            <p>
              Using your wrists as controllers, select chords, notes, and loops. Don’t forget to show off your best dance moves!
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
