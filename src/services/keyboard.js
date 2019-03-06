const Tone = require('tone');
var synth = new Tone.AMSynth().toMaster();

/* *****play Synth notes based on key-point (partNum) position ***** */
export function keyboard(number, pose) {
  let Y = pose.keypoints[number].position.y;
  let X = pose.keypoints[number].position.x;
  let accurate = function() {
    return pose.score >= 0.4;
  };
  let withinKy = function() {
    return X >= 320 && X <= 640 && (Y >= 90 && Y <= 385) && accurate();
  };

  // console.log(X, Y);
  if (withinKy() && Y <= 132) {
    console.log('Note C');
    synth.triggerAttackRelease('c3', '8n');
    // TODO: Update Color of the C key on the DOM
  } else if (withinKy() && Y <= 174 && Y >= 133) {
    console.log('Note D');
    synth.triggerAttackRelease('d3', '8n');
  } else if (withinKy() && Y <= 216 && Y >= 175) {
    console.log('Note E');
    synth.triggerAttackRelease('e3', '8n');
  } else if (withinKy() && Y <= 258 && Y >= 217) {
    console.log('Note F');
    synth.triggerAttackRelease('f3', '8n');
  } else if (withinKy() && Y <= 300 && Y >= 259) {
    console.log('Note G');
    synth.triggerAttackRelease('g3', '8n');
  } else if (withinKy() && Y <= 342 && Y >= 301) {
    console.log('Note A');
    synth.triggerAttackRelease('a3', '8n');
  } else if (withinKy() && Y <= 384 && Y >= 343) {
    console.log('Note B');
    synth.triggerAttackRelease('b3', '8n');
  }
}

export default keyboard;
