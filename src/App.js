import React, { Component } from 'react';
// import { getImagePosition } from "./posenet/helpers.js";
import * as posenet from '@tensorflow-models/posenet';
// import * as ml5 from "ml5";
const context = new AudioContext();
const Tone = require('tone');
var synth = new Tone.AMSynth().toMaster();

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
    console.log('did mount');
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

    function bodyPos(partNum) {
      let Y = pose.keypoints[partNum].position.y;
      let X = pose.keypoints[partNum].position.x;
      if (Y >= 0 && Y <= 50 && X <= 50 && X >= 0) {
        console.log('Note A');
        synth.triggerAttackRelease('c1', '8n');
      } else if (Y >= 0 && Y <= 50 && X >= 250 && X <= 300) {
        console.log('Note B');
        synth.triggerAttackRelease('c2', '8n');
      } else if (Y < 300 && Y >= 250 && X <= 50 && X >= 0) {
        console.log('Note C');
        synth.triggerAttackRelease('c3', '8n');
      } else if (Y < 300 && Y >= 250 && X >= 250 && X <= 300) {
        console.log('Note D');
        synth.triggerAttackRelease('c4', '8n');
      }
    }
    bodyPos(9);
    bodyPos(10);

    this.initCapture();
  };

  render() {
    return (
      <div>
        <h1>Jam Cam</h1>
        <div id="overlay_container">
          <div id="overlay_1" />
          <div id="overlay_2" />
          <div id="overlay_3" />
          <div id="overlay_4" />
          <video id="video" playsInline ref={this.setRef} />
        </div>
      </div>
    );
  }
}
export default App;
