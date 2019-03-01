import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as posenet from '@tensorflow-models/posenet';

import { getImagePosition } from './posenet/helpers.js';

const context = new AudioContext();
const Tone = require('tone');
var synth = new Tone.AMSynth().toMaster();

//attach a listener to all of the buttons
document.querySelectorAll('button').forEach(function(button) {
  button.addEventListener('click', function(e) {
    context.resume();

    //play the note on mouse down

    if (e.currentTarget.classList.contains('active')) {
      e.currentTarget.classList.remove('active');
      synth.triggerRelease();
    } else {
      e.currentTarget.classList.add('active');
      synth.triggerAttack(e.target.textContent);
    }
  });
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {},
      posenetArray: []
    };
  }

  componentDidMount = async () => {
    console.log('did mount');
    var imageElement = document.getElementById('img1');
    console.log(imageElement);

    const video = await this.setupCamera(this.videoElement);
    getImagePosition(video);
    video.play();
  };

  setupCamera = async videoElement => {
    videoElement.width = 800;
    videoElement.height = 800;

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
