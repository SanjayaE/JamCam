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
    var c = document.getElementById('overlay');
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillRect(0, 250, 50, 50);
    ctx.fillRect(250, 250, 50, 50);
    ctx.fillRect(250, 0, 50, 50);
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

    //console.log(pose.keypoints[0].position.y);
    let nY = pose.keypoints[0].position.y;
    let nX = pose.keypoints[0].position.x;
    console.log('nose position Y:', nY);
    console.log('nose position X:', nX);
    context.resume();
    if (nY <= 50 && nX <= 50) {
      console.log('Note A');

      synth.triggerAttackRelease('c1', '8n');
    } else if (nY <= 50 && nX >= 250) {
      console.log('Note B');

      synth.triggerAttackRelease('c2', '8n');
    } else if (nY >= 250 && nX <= 50) {
      console.log('Note C');

      synth.triggerAttackRelease('c3', '8n');
    } else if (nY >= 250 && nX >= 250) {
      console.log('Note D');

      synth.triggerAttackRelease('c4', '8n');
    }
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
          <video className="video" playsInline ref={this.setRef} />
        </div>
      </div>
    );
  }
}
export default App;
