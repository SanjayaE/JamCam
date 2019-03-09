import React, { Component } from 'react';

class Tracks extends Component {
  render() {
    return (
      <div id="loops_container">
        <div className={this.props.cb('tracks', 'beat1')}>1</div>
        <div className={this.props.cb('tracks', 'beat2')}>2</div>
        <div className={this.props.cb('tracks', 'beat3')}>3</div>
        <div className={this.props.cb('tracks', 'bassline1')}>4</div>
        <div className={this.props.cb('tracks', 'bassline2')}>5</div>
        <div className={this.props.cb('tracks', 'bassline3')}>6</div>
      </div>
    );
  }
}

export default Tracks;
