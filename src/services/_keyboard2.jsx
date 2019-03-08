import React, { Component } from 'react';

class KeyBoard2 extends Component {
  render() {
    return (
      <div id="keyboard2_container">
        <div className={this.props.cb('keys2', 'a2')}>1</div>
        <div className={this.props.cb('keys2', 'b2')}>2</div>
        <div className={this.props.cb('keys2', 'c3')}>3</div>
        <div className={this.props.cb('keys2', 'd3')}>4</div>
        <div className={this.props.cb('keys2', 'e3')}>5</div>
        <div className={this.props.cb('keys2', 'f3')}>6</div>
        <div className={this.props.cb('keys2', 'g3')}>7</div>
        <div className={this.props.cb('keys2', 'a3')}>8</div>
      </div>
    );
  }
}

export default KeyBoard2;
