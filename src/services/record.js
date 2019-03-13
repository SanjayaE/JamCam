import React, { Component } from "react";
import { stopAudio } from "./tone_manager.js";
const Tone = require("tone");

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      download: false
    };
  }
  componentDidMount() {
    const b = document.querySelector("#record");
    const c = document.querySelector("#stop");
    let clicked = false;
    const chunks = [];
    const actx = Tone.context;
    const dest = actx.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(dest.stream);
    const source = Tone.Master;
    source.connect(dest);

    //using self so it will not overwritten by this.state of dom element
    // let self = this;
    b.addEventListener('click', e => {
      // console.log('state2:', self.state);
      if (this.state.recording === false) {
        mediaRecorder.start();
        e.target.innerHTML = 'Stop recording';
        // clicked = true;
        this.setState({ recording: true });
      } else {
        mediaRecorder.stop();
        // e.target.disabled = true;
        e.target.innerHTML = 'Record';
      }
    });

    // just to stop tone.js playback
    c.addEventListener('click', function (e) {
      stopAudio();
    });

    mediaRecorder.ondataavailable = evt => {
      console.info('Finished recording. Got blob:', evt.data);
      // push each chunk (blobs) in an array
      chunks.push(evt.data);
    };

    mediaRecorder.onstop = evt => {
      this.setState({ recording: false, download: true });
      // Make blob out of our blobs, and open it.
      console.log('after record;', this.state);
      let blob = new Blob(chunks, { type: 'audio/mpeg-3' });
      document.querySelector('audio').src = URL.createObjectURL(blob);
      var url = document.querySelector('audio').src;
      var link = document.getElementById('download');
      link.href = url;
      link.download = 'JamCam_audio.wav';
      // evt.target.innerHTML = 'Record';
      // evt.target.disabled = false;

      console.log('after record;', this.state);
    };
  }

  // …
  render() {
    if (this.state.download === true) {
      return (
        <div>
          <div>
            <button id="record">Record</button>
            <div>
              <a id="download"> Download</a>
            </div>
            <audio controls />
          </div>
          <div>
            <button id="stop">Stop Music</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <button id="record">Record</button>
            <audio controls />
          </div>
          <div>
            <button id="stop">Stop Music</button>
          </div>
        </div>
      );
    }
  }
}
export default Record;
