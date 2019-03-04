import React, { Component } from "react";
import capture from "./services/capture.js";
import * as posenet from '@tensorflow-models/posenet';
const context = new AudioContext();
const Tone = require('tone');
var synth = new Tone.AMSynth().toMaster();


class App extends Component {
  constructor(props) {
    super(props);
    this.video = {};
    this.state = {
    };
  }

  componentDidMount = async () => {

    console.log("did mount");
    capture();
  };

  render() {
    return (
      <div className="container">
        <h1>Jam Cam</h1>
        <video id="video" width="640" height="480" controls autoPlay />
        <canvas id="overlay" />

        {/* <div id="overlay_container">
          <canvas id="overlay" height="300" width="300" />

        <video className="video" playsInline ref={this.setRef} />
        </div> */}
      </div>
    );
  }
}
export default App;
