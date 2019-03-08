import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { dest, synth } from "../tone_manager.js";
import { NavLink } from "react-router-dom";
const Tone = require("tone");
// class Record extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       recording: false,
//       audios: []
//     };
//   }
//   componentDidMount() {
//     const a = document.getElementsByTagName("audio")[0];
//     const b = document.querySelector("button");
//     let clicked = false;
//     const chunks = [];
//     const ac = new AudioContext();
//     const dest = ac.createMediaStreamDestination();
//     const mediaRecorder = new MediaRecorder(dest.stream);
//     const source = ac.createMediaElementSource(a);
//     source.connect(dest);

//     b.addEventListener("click", function(e) {
//       if (!clicked) {
//         mediaRecorder.start();
//         e.target.innerHTML = "Stop recording";
//         clicked = true;
//       } else {
//         mediaRecorder.stop();
//         e.target.disabled = true;
//       }
//     });

//     mediaRecorder.ondataavailable = evt => {
//       console.info("Finished recording. Got blob:", evt.data);
//       // push each chunk (blobs) in an array
//       chunks.push(evt.data);
//     };

//     mediaRecorder.onstop = function(evt) {
//       // Make blob out of our blobs, and open it.
//       var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//       document.querySelector("audio").src = URL.createObjectURL(blob);
//     };
//   }

//   // …
//   render() {
//     return (
//       <div>
//         <button>Record</button>
//         <audio controls />
//       </div>
//     );
//   }
// }
// export default Record;

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: []
    };
  }
  componentDidMount() {
    const a = document.getElementsByTagName("audio")[0];
    const b = document.querySelector("button");
    let clicked = false;
    const chunks = [];
    const ac = new AudioContext();
    const dest = ac.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(dest.stream);
    const source = ac.createMediaElementSource(a);
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

    mediaRecorder.ondataavailable = evt => {
      console.info("Finished recording. Got blob:", evt.data);
      // push each chunk (blobs) in an array
      chunks.push(evt.data);
    };

    mediaRecorder.onstop = function(evt) {
      // Make blob out of our blobs, and open it.
      var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      document.querySelector("audio").src = URL.createObjectURL(blob);
    };
  }

  // …
  render() {
    return (
      <div>
        <button>Record</button>
        <audio controls />
      </div>
    );
  }
}
export default Record;
