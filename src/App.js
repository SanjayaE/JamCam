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

    function keyBoard(partNum) {
      let Y = pose.keypoints[partNum].position.y;
      let X = pose.keypoints[partNum].position.x;
      let accurate = function() {
        return pose.score >= 0.4;
      };
      let withinKy = function() {
        return X >= 0 && X >= 100 && (Y >= 0 && Y <= 300) && accurate();
      };

      // console.log(X, Y);
      if (withinKy && Y <= 42) {
        console.log('Note C');
        synth.triggerAttackRelease('c3', '8n');
      } else if (withinKy() && Y <= 84 && Y >= 43) {
        console.log('Note D');
        synth.triggerAttackRelease('d3', '8n');
      } else if (withinKy() && Y <= 126 && Y >= 85) {
        console.log('Note E');
        synth.triggerAttackRelease('e3', '8n');
      } else if (withinKy() && Y <= 168 && Y >= 127) {
        console.log('Note F');
        synth.triggerAttackRelease('f3', '8n');
      } else if (withinKy() && Y <= 210 && Y >= 69) {
        console.log('Note G');
        synth.triggerAttackRelease('g3', '8n');
      } else if (withinKy() && Y <= 252 && Y >= 211) {
        console.log('Note A');
        synth.triggerAttackRelease('a3', '8n');
      } else if (withinKy() && Y <= 294 && Y >= 253) {
        console.log('Note B');
        synth.triggerAttackRelease('b3', '8n');
      }
    }
    // keyBoard(0); //nose
    keyBoard(9); //left wrist
    keyBoard(10); //right wrist

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
