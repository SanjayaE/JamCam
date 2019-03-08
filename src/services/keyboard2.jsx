import React, { Component } from 'react';

class KeyBoard2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="keyboard2_container">
        <div className={cb('keys2', 'mega_chord1')}>1</div>
        <div className={cb('keys2', 'mega_chord2')}>2</div>
        <div className={cb('keys2', 'mega_chord3')}>3</div>
        <div className={cb('keys2', 'mega_chord4')}>4</div>
        <div className={cb('keys2', 'mega_chord5')}>5</div>
        <div className={cb('keys2', 'mega_chord6')}>6</div>
        <div className={cb('keys2', 'mega_chord7')}>7</div>
        <div className={cb('keys2', 'mega_chord8')}>8</div>
      </div>
    );
  }
}
