import React, { Component } from 'react';

import { getImagePosition } from './posenet/helpers.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {},
      posenetArray: []
    }
  }

  componentDidMount = async () => {
    console.log("did mount")
    var imageElement = document.getElementById('img1');
    console.log(imageElement)


    const video = await this.setupCamera(this.videoElement);
    getImagePosition(video)
    video.play();
  }

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
        <img id='img1' src='/images/anatomy_287_3321_bjkforsacrum.jpg' alt="yoga" />
        <video className="video" playsInline ref={this.setRef} />
      </div>
    );
  }
}
export default App;