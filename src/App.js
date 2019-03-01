import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as posenet from '@tensorflow-models/posenet';
// import { Tone } from 'tone';
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
      net: {}
    };
  }

  async componentDidMount() {
    let net = await posenet.load(1.01);
    this.setState({ net });

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: 600,
        width: 600,
        facingMode: 'user'
      }
    });

    const videoElement = document.getElementById('video-stream');

    // If the below two lines are missed out, the error appears!
    // videoElement.width = 600;
    // videoElement.height = 600;

    videoElement.srcObject = mediaStream;
    videoElement = await new Promise((resolve, reject) => {
      videoElement.onloadedmetadata = () => resolve(videoElement);
    });
    videoElement.play();

    // The next line throws if the object does not have `width` and `height` explicitly set!
    const pose = await net.estimateSinglePose(videoElement);
  }

  render() {
    console.log(posenet);
    return <div> root</div>;
  }
}

export default App;
