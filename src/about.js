import React, { Component } from 'react';
import matt from './img/matt.jpg';

class About extends Component {
  componentDidMount() {}

  render() {
    return (
      <div id="about">
        <h2>♫ Let the music move you! ♫</h2>
        <p>
          JamCam is an interactive music making app, that transforms your sweet
          moves into sweet grooves. Everything runs in your browser, your data
          isn't sent anywhere (so don't worry, big brother can't see you
          dancing).
        </p>
        <h3>How does it work?</h3>
        <p>
          JamCam uses TensorFlow, a machine learning API that can recognize
          people or objects in images or videos, and PoseNet, a pre-trained
          model that recognizes the position of the human body. The jams are
          provided by Tone.Js, a virtual synthesizer plug-in. All you have to do
          is your wrists in the right area, and enjoy the magic.
        </p>
        <h3 />
        <h3> Who made this?</h3>
        <div class="info_card">
          <h5>Julia Romanowski, international Jam wrangler.</h5>
          <p>Write whatever the frig you want here.</p>
        </div>
        <div className="info_card">
          <div className="profile_pic">
            <img src={matt} height="200" />
          </div>
          <h5>Matt Esteves, head of getting down.</h5>
          <p>
            Matt worked with machine learning and A.I. making chatbots for
            years. Coming from an entertianment background, Matt has a passion
            for making tech fun and engaging for everyone.
          </p>
        </div>
        <div class="info_card">
          <h5>Dusantha Ekanayake, Chief Freshness Officer</h5>
          <p>Write whatever the frig you want here.</p>
        </div>
      </div>
    );
  }
}

export default About;
