import React, { Component } from "react";
import { drawKeypoints, drawSkeleton } from "./posenet/helpers.js";
import * as posenet from "@tensorflow-models/posenet";
const videoWidth = 600;
const videoHeight = 500;

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
    const canvas = this.canvas;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
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

  getCanvas = cv => {
    this.canvas = cv;
  };

  //capture body position
  initCapture = () => {
    this.capture();
  };

  //locate and log nose position
  capture = async () => {
    var imageScaleFactor = 0.5;
    var outputStride = 8;
    var flipHorizontal = true;

    const pose = await this.net.estimateSinglePose(
      this.video,
      imageScaleFactor,
      flipHorizontal,
      outputStride
    );
    let poses = [];
    poses.push(pose);

    var canvas = document.getElementById("overlay");
    var ctx = canvas.getContext("2d");
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-this.video.videoWidth, 0);
    ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );
    ctx.restore();

    poses.forEach(({ score, keypoints }) => {
      if (score >= 0.2) {
        drawKeypoints(keypoints, 0.5, ctx);
        drawSkeleton(keypoints, 0.5, ctx);
      }
    });

    this.initCapture();
  };

  render() {
    return (
      <div className="container">
        <h1>Jam Cam</h1>
        <video id="video" playsInline ref={this.setRef} />
        <canvas id="overlay" ref={this.getCanvas} />
      </div>
    );
  }
}
export default App;
