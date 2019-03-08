import React, { Component } from "react";
import { synth, chords } from "./tone_manager.js";
import { stopAudio } from "./tone_manager.js";
const Tone = require("tone");

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: []
    };
  }
  componentDidMount() {
    // const a = document.getElementsByTagName("audio")[0];
    const b = document.querySelector("#record");
    const c = document.querySelector("#stop");
    let clicked = false;
    const chunks = [];
    const actx = Tone.context;
    // const ac = new AudioContext();
    const dest = actx.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(dest.stream);
    const source = synth;
    // const source = chords;
    source.connect(dest);

    b.addEventListener("click", function(e) {
      if (!clicked) {
        mediaRecorder.start();
        e.target.innerHTML = "Stop recording";
        clicked = true;
      } else {
        mediaRecorder.stop();
        e.target.disabled = true;
      }
    });

    c.addEventListener("click", function(e) {
      if (clicked) {
        stopAudio();
      }
    });

    mediaRecorder.ondataavailable = evt => {
      console.info("Finished recording. Got blob:", evt.data);
      // push each chunk (blobs) in an array
      chunks.push(evt.data);
    };

    mediaRecorder.onstop = function(evt) {
      // Make blob out of our blobs, and open it.
      var blob = new Blob(chunks, { type: "audio/mpeg-3" });
      document.querySelector("audio").src = URL.createObjectURL(blob);
    };
  }

  // …
  render() {
    return (
      <div>
        <div>
          <button id="record">Record</button>
          <audio controls />
        </div>
        <div>
          <button id="stop">Stop</button>
        </div>
      </div>
    );
  }
}
export default Record;
