const Tone = require("tone");
var synth = new Tone.AMSynth().toMaster();

/* *****play Synth notes based on key-point (partNum) position ***** */
export function keyboard(number, pose) {
  let Y = pose.keypoints[number].position.y;
  let X = pose.keypoints[number].position.x;
  let accurate = function() {
    return pose.score >= 0.4;
  };
  let withinKy = function() {
    return X >= 0 && X >= 100 && (Y >= 0 && Y <= 300) && accurate();
  };

  // console.log(X, Y);
  if (withinKy && Y <= 42) {
    console.log("Note C");
    synth.triggerAttackRelease("c3", "8n");
  } else if (withinKy() && Y <= 84 && Y >= 43) {
    console.log("Note D");
    synth.triggerAttackRelease("d3", "8n");
  } else if (withinKy() && Y <= 126 && Y >= 85) {
    console.log("Note E");
    synth.triggerAttackRelease("e3", "8n");
  } else if (withinKy() && Y <= 168 && Y >= 127) {
    console.log("Note F");
    synth.triggerAttackRelease("f3", "8n");
  } else if (withinKy() && Y <= 210 && Y >= 69) {
    console.log("Note G");
    synth.triggerAttackRelease("g3", "8n");
  } else if (withinKy() && Y <= 252 && Y >= 211) {
    console.log("Note A");
    synth.triggerAttackRelease("a3", "8n");
  } else if (withinKy() && Y <= 294 && Y >= 253) {
    console.log("Note B");
    synth.triggerAttackRelease("b3", "8n");
  }
}

export default keyboard;
