import React, { Component } from 'react';
import KeyBoard from './key_board';
import LoopBoard from './loop_board';
import SynthBoard from './synth_board';
import TrackBoard from './track_board';

class InteractiveWindow extends Component {
  render() {
    if (this.props.mode === 1) {
      return (
        <div className="container">
          <KeyBoard leftWrist={this.props.leftWrist} />
          <LoopBoard rightWrist={this.props.rightWrist} />
        </div>
      );
    } else {
      return (
        <div className="container">
          <SynthBoard leftWrist={this.props.leftWrist} />
          {/* <TrackBoard rightWrist={this.props.rightWrist} /> */}
        </div>
      );
    }
  }
}

export default InteractiveWindow;
