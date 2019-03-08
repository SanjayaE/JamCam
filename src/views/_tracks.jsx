import React, { Component } from 'react';

class Tracks extends Component {
  render() {
    return (
      <div id="loops_container">
        <div className={this.props.cb('tracks', 'button1')}> 1</div>
        <div className={this.props.cb('tracks', 'button2')}>2</div>
        <div className={this.props.cb('tracks', 'button3')}>3</div>
        <div className={this.props.cb('tracks', 'button4')}>4</div>
        <div className={this.props.cb('tracks', 'button5')}>5</div>
        <div className={this.props.cb('tracks', 'button6')}>6</div>
      </div>
    );
  }
}

export default Tracks;
