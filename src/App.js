import React, { Component } from "react";
// import { getImagePosition } from "./posenet/helpers.js";
import * as posenet from "@tensorflow-models/posenet";
// import * as ml5 from "ml5";

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
    console.log("did mount");
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
          facingMode: "user",
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
        "This browser does not support video capture, or this device does not have a camera";
      alert(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

  setRef = async videoElement => {
    this.videoElement = videoElement;
  };

  //capture body position
  initCapture = () => {
    this.capture()
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
    let eX = pose.keypoints[0].position.x;
    console.log("nose position Y:", nY);
    console.log("nose position X:", eX);
    this.initCapture();
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
