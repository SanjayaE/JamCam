import React, { Component } from 'react';
import * as posenet from '@tensorflow-models/posenet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: {}
    }
    this.getImagePosition = this.getImagePosition.bind(this);
  }
  async getImagePosition(image) {
    var imageScaleFactor = 0.5;
    var outputStride = 16;
    var flipHorizontal = false;
    console.log("Posnet gonna load");
    const net = posenet.load().then(whatever => {
      console.log("Posnet loaded");
    });
    //const pose = await net.estimateSinglePose(image, imageScaleFactor, flipHorizontal, outputStride);
    //console.log(pose)
  }

  componentDidMount() {
    console.log("did mount")
    var imageElement = document.getElementById('img1');
    console.log(imageElement)
    this.getImagePosition(imageElement)
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