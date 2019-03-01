import React, { Component } from 'react';
import { getImagePositions } from './posenet/helpers.js';
// import { keep } from '@tensorflow/tfjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {},
      posenetArray: []
    }
  }

  componentDidMount = async () => {
    if (!this.video) {
      this.video = await this.setupCamera(this.videoElement);
      this.video.play();
    }
    this.initCapture()

  }

  initCapture = () => {
    this.timeout = setTimeout(() => {
      getImagePositions(this.video)
      this.initCapture()
    }, 300);
  }

  // video camera set up on site load
  setupCamera = async (videoElement) => {
    videoElement.width = 300;
    videoElement.height = 300;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
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
      const errorMessage = "This browser does not support video capture, or this device does not have a camera";
      alert(errorMessage);
      return Promise.reject(errorMessage);
    }
  }

  setRef = async (videoElement) => {
    this.videoElement = videoElement;
  }


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