import React, { Component } from "react";
class Landing extends React.Component {
  // …
  render() {
    return (
      <div>
        <p>Text: {this.state.mode}</p>
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
        <button onClick={this.setModeChange}>JamTheCam</button>
      </div>
    );
  }
}
export default Landing;
