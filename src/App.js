import React, { Component } from "react";
import capture from "./posenet/capture.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.video = {};
    this.state = {
      // net: {},
      // posenetArray: []
    };
  }

  componentDidMount = async () => {
    console.log("did mount");
    capture();
  };

  render() {
    return (
      <div className="container">
        <h1>Jam Cam</h1>
        <video id="video" width="640" height="480" controls autoPlay />
        <canvas id="overlay" />
      </div>
    );
  }
}
export default App;
