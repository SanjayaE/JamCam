import React, { Component } from 'react';
import InteractiveWindow from './interactive_window';
import Panel from './panel';
import { stopAudio } from '../services/tone_manager.js';
import capture from '../services/capture';
import { CameraStart, CameraStop } from '../services/camera';
import Loading from './loading.js';
const Tone = require('tone');
var timer;

class JamCam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyPartLocation: {
        leftWrist: {
          x: 0,
          y: 0
        },
        rightWrist: {
          x: 0,
          y: 0
        },
        nose: {
          score: 0
        }
      },
      mode: 1,
      isLoading: true
    };
  }

  componentDidMount = async () => {
    this.showLoader();

    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):

    if (this.state.isLoading === false) {
      this.hideLoader();
      //   this.toneVol();
    }
  }

  componentWillUnmount = () => {
    //turn off camera and audio when you switch from the video page
    CameraStop();
    stopAudio();
  };

  //   toneVol = () => {
  //     if (this.state.bodyPartLocation.nose.score < 0.9) {
  //       this.toneVolumeDown();
  //     }
  //     if (this.state.bodyPartLocation.nose.score > 0.99) {
  //       this.toneVolumeUp();
  //     }
  //   };

  //Takes in body part locations and maps to keyboard and loops
  receiveNewBodyPartLocation = bodyPartLocation => {
    this.setState({
      bodyPartLocation
    });
  };

  showLoader = () => {
    CameraStart();
    timer = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  };

  hideLoader = () => {
    clearTimeout(timer);
  };

  //   toneVolumeUp = () => {
  //     console.log('Nose detected');
  //   };
  //   toneVolumeDown = () => {
  //     console.log('No Nose ');
  //   };

  render() {
    return (
      <div className="container">
        <InteractiveWindow
          leftWrist={this.state.bodyPartLocation.leftWrist}
          rightWrist={this.state.bodyPartLocation.rightWrist}
          //   noseScore={this.state.nose.score}
        />
        <video id="video" width="640" height="480" controls autoPlay />
        <Loading visible={this.state.isLoading} />
        <canvas id="overlay" />
        <Panel />
      </div>
    );
  }
}

export default JamCam;
