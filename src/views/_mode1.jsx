import React, { Component } from 'react';

class Mode1 extends Component {
  render() {
    return (
      <div>
        <div>
          <div className={this.props.cb('keys', 'chord1')}>1</div>
          <div className={this.props.cb('keys', 'chord2')}>2</div>
          <div className={this.props.cb('keys', 'chord3')}>3</div>
          <div className={this.props.cb('keys', 'chord4')}>4</div>
        </div>
        <div id="loops_container">
          <div className={this.props.cb('loops', 'kick')}>Kick</div>
          <div className={this.props.cb('loops', 'bass')}>Bass</div>
          <div className={this.props.cb('loops', 'clap')}>Clap</div>
          <div className={this.props.cb('loops', 'hat')}>Hat</div>
          <div className={this.props.cb('loops', 'perc')}>Perc</div>
          <div className={this.props.cb('loops', 'vocal')}>Vocal</div>
        </div>
      </div>
    );
  }
}

export default Mode1;
