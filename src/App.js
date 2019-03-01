import React, { Component } from 'react';

import { getImagePosition } from './posenet/helpers.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {},
      posenetArray: []
    }
  }

  componentDidMount() {
    console.log("did mount")
    var imageElement = document.getElementById('img1');
    console.log(imageElement)
    getImagePosition(imageElement)
  }

  render() {
    return (
      <div>
        <h1>Jam Cam</h1>
        <img id='img1' src='/images/anatomy_287_3321_bjkforsacrum.jpg' alt="yoga" />
      </div>
    );
  }
}
export default App;