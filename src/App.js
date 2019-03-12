import React, { Component } from 'react';
import JamCam from './components/jam_cam.js';
import backgroundImage from "./img/90s2.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1
    };
  }

  render() {
    return (
      <div className="container">
        <JamCam />
        {/* <img class="logo_img" src={backgroundImage} alt="90s_baby" /> */}
      </div>
    );
  }
}
export default App;
