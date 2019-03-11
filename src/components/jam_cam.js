import React, { Component } from 'react';
import InteractiveWindow from './interactive_window';
import Panel from './panel';
import { stopAudio } from '../services/tone_manager.js';
import capture from '../services/capture';
import { CameraStart, CameraStop } from '../services/camera';
import Loading from './loading.js';
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
        }
      },
      mode: 1,
      isLoading: true,
      isChecked: false
    };
  }

  componentDidMount = async () => {
    this.showLoader();

    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):

    if (this.state.isLoading === false && this.state.isChecked === false) {
      this.hideLoader();
    }
  }

  componentWillUnmount = () => {
    //turn off camera and audio when you switch from the video page
    CameraStop();
    stopAudio();
  };

  //Takes in body part locations and maps to keyboard and loops
  receiveNewBodyPartLocation = bodyPartLocation => {
    this.setState({
      bodyPartLocation
    });
  };

  //Takes in body part locations and maps to keyboard and loops
  receiveNewBodyPartLocation = bodyPartLocation => {
    this.setState({
      bodyPartLocation
    });
  };

  toggleMode = () => {
    let mode;
    if (this.state.mode === 1) {
      mode = 2;
    } else {
      mode = 1;
    }
    stopAudio();
    this.setState({ mode });
  };

  showLoader = () => {
    CameraStart();
    timer = setTimeout(() => {
      this.setState({ isLoading: false });
      console.log('timer start');
    }, 1000);
  };

  hideLoader = () => {
    clearTimeout(timer);
    console.log('timer off');
    this.setState({ isChecked: true });
  };

  render() {
    return (
      <div className="container">
        <InteractiveWindow
          leftWrist={this.state.bodyPartLocation.leftWrist}
          rightWrist={this.state.bodyPartLocation.rightWrist}
          mode={this.state.mode}
        />
        <video id="video" width="640" height="480" controls autoPlay />
        <Loading visible={this.state.isLoading} />
        <canvas id="overlay" />
        <Panel mode={this.state.mode} toggleMode={this.toggleMode} />
      </div>
    );
  }
}

export default JamCam;
