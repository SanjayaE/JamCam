import React, { Component } from "react";
import { synth, chords, loops } from "./tone_manager.js";
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
    // const source = synth;
    const source = Tone.Master;
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
      let blob = new Blob(chunks, { type: "audio/mpeg-3" });
      document.querySelector("audio").src = URL.createObjectURL(blob);
      var url = document.querySelector("audio").src;
      var link = document.getElementById("download");
      link.href = url;
      link.download = "audio.wav";
    };
  }

  // …
  render() {
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
          <button id="stop">Stop</button>
        </div>
      </div>
    );
  }
}
export default Record;
