import React, { Component } from 'react';
import * as posenet from '@tensorflow-models/posenet';

import { getImagePosition } from './posenet/helpers.js';

const MILLISECONDS = 1000;

const flipHorizontal = true;
const maxVideoSize = 300;
const weight = 0.5;
const initialPosition = 40;

const context = new AudioContext();
const Tone = require('tone');
var synth = new Tone.AMSynth().toMaster();

//attach a listener to all of the buttons
document.querySelectorAll('button').forEach(function(button) {
  button.addEventListener('click', function(e) {
    context.resume();

    //play the note on mouse down

    // if (e.currentTarget.classList.contains('active')) {
    //   e.currentTarget.classList.remove('active');
    //   synth.triggerRelease();
    // } else {
    //   e.currentTarget.classList.add('active');
    //   synth.triggerAttack(e.target.textContent);
    // }
  });
});

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
    getImagePosition(this.video);
    this.video.play();
    this.initCapture();
  };

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

  initCapture = () => {
    this.timeout = setTimeout(this.capture, MILLISECONDS);
  };

  capture = async () => {
    // alert("line 95");
    let pose;
    // alert("line 95");

    // if (!this.videoElement || !this.net) {
    //   this.initCapture();
    //   return;
    // }

    // if (!this.video && this.videoElement) {
    //   this.video = await this.loadVideo(this.videoElement);
    // }
    pose = await getImagePosition(this.video);
    // const poses = await this.net.estimateSinglePose(
    //this.video,
    //   imageScaleFactor,
    //   flipHorizontal,
    //   outputStride
    // );

    // if (poses && poses.keypoints) {
    //   nose = poses.keypoints.filter(keypoint => keypoint.part === "nose")[0];
    // }
    // if (nose) {
    //   this.setState({
    //     top: (nose.position.y * 100) / maxVideoSize,
    //     left: (nose.position.x * 100) / maxVideoSize,
    //     oldTop: this.state.top,
    //     oldLeft: this.state.left
    //   });
    // }

    //console.log(pose.keypoints[0].position.y);
    let nY = pose.keypoints[0].position.y;
    let eX = pose.keypoints[0].position.x;
    console.log('nose position Y:', nY);
    console.log('nose position X:', eX);
    this.initCapture();
  };

  // function draw() {
  //   image(video, 0, 0);

  //   // let d = dist(noseX, noseY, eyelX, eyelY);

  //   fill(255, 0, 0);
  //   ellipse(nY, eX);
  //   //fill(0,0,255);
  //   ellipse(eyelX, eyelY, 50);

  // }

  render() {
    return (
      <div>
        <h1>Jam Cam</h1>
        <video className="video" playsInline ref={this.setRef} />
      </div>
    );
  }
}
export default App;
