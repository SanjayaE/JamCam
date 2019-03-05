import React, { Component } from 'react';
import { keyboard } from './keyboard.js';
// import { getImagePosition } from "./posenet/helpers.js";
import * as posenet from '@tensorflow-models/posenet';
// import * as ml5 from "ml5";
const context = new AudioContext();


class App extends Component {
  constructor(props) {
    super(props);
    this.video = {};
    this.state = {
      net: {},
      posenetArray: []
    };
  }

  componentDidMount = async () => {
    this.video = await this.setupCamera(this.videoElement);
    this.net = await posenet.load();
    this.video.play();
    this.initCapture();
  };

  //load video camera
  setupCamera = async videoElement => {
    videoElement.width = 300;
    videoElement.height = 300;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
          width: 300,
          height: 300
        }
      });
      videoElement.srcObject = stream;

      return new Promise(resolve => {
        videoElement.onloadedmetadata = () => {
          resolve(videoElement);
        };
      });
    } else {
      const errorMessage =
        'This browser does not support video capture, or this device does not have a camera';
      alert(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

  setRef = async videoElement => {
    this.videoElement = videoElement;
  };

  //capture body position
  initCapture = () => {
    this.capture();
  };

  //locate and log nose position
  capture = async () => {
    var imageScaleFactor = 0.5;
    var outputStride = 8;
    var flipHorizontal = false;

    const pose = await this.net.estimateSinglePose(
      this.video,
      imageScaleFactor,
      flipHorizontal,
      outputStride
    );

    context.resume();


    //play Synth notes based on key-point (partNum) position


    // keyBoard(0); //nose
    keyboard(9, pose); //left wrist
    keyboard(10, pose); //right wrist

    this.initCapture();
  };

  render() {
    return (
      <div>
        <h1>Jam Cam</h1>
        <div id="overlay_container">
          <div className="overlay_C">C</div>
          <div className="overlay_D">D</div>
          <div className="overlay_E">E</div>
          <div className="overlay_F">F</div>
          <div className="overlay_G">G</div>
          <div className="overlay_A">A</div>
          <div className="overlay_B">B</div>

          <video id="video" playsInline ref={this.setRef} />
        </div>
      </div>
    );
  }
}
export default App;