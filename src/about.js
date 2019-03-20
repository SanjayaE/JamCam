import React, { Component } from 'react';
import matt from './img/matt.jpg';
import julia from './img/julia.png';
import Dushantha from './img/de.jpg';

class About extends Component {
  componentDidMount() { }

  render() {
    return (
      <div id="about">
        <h1 class="about_title">♫ Let the music move you! ♫</h1>
        <div class="text_block">
          <p>
            JamCam is an interactive music making app, that transforms your
            sweet moves into sweet grooves. Everything runs in your browser,
            your data isn't sent anywhere (so don't worry, big brother can't see
            you dancing).
          </p>
        </div>
        <div class="text_block">
          <h3>How does it work?</h3>
          <p>
            JamCam uses TensorFlow, an open source machine learning library, and
            PoseNet, a pre-trained model that recognizes the position of the
            human body. The jams are provided by Tone.Js, a framework for
            creating interactive music in the browser. All you have to do is
            your put wrists in the right area, and enjoy the magic.
          </p>
        </div>
        <h3> Who made this?</h3>
        <div class="info_card">
          <div className="profile_pic">
            <img src={julia} height="200" />
          </div>
          <div class="card-text">
            <h4>Julia Romanowski, international Jam wrangler.</h4>
            <p>
              Julia likes to use code and technology to make creative projects.
              On the side, she also makes electronic music. This project was
              really exciting to her because she got to combine two of her
              favorite things.
            </p>
          </div>
        </div>
        <div className="info_card">
          <div className="profile_pic">
            <img src={matt} height="200" />
          </div>
          <div class="card-text">
            <h4>Matt Esteves, head of getting down.</h4>
            <p>
              Matt worked with machine learning and A.I. making chatbots for
              years. Coming from an entertianment background, Matt has a passion
              for making tech fun and engaging for everyone.
            </p>
          </div>
        </div>
        <div class="info_card">
          <div className="profile_pic">
            <img src={Dushantha} height="200" />
          </div>
          <div class="card-text">
            <h4>Dushantha Ekanayake, Chief Freshness Officer</h4>
            <p>
              Dusantha is a combination of a biologist and software developer.
              Avid reader, learner and entrepreneur.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
