// const Tone = require('tone');
// var synth = new Tone.AMSynth().toMaster();

/* *****play Synth notes based on key-point (partNum) position ***** */
const keyboard = async (pose, cb) => {
  let Y = pose.x;
  let X = pose.y;
  console.log('keyboard debug ', pose);
  // let accurate = function() {
  //   return pose.score >= 0.4;
  // };
  let withinKy = function() {
    return X >= 320 && X <= 640 && (Y >= 90 && Y <= 385);
  };

  // console.log(X, Y);
  if (withinKy() && Y <= 132) {
    console.log('Note C');
    cb('C');
    // TODO: Update Color of the C key on the DOM
  } else if (withinKy() && Y <= 174 && Y >= 133) {
    console.log('Note D');
    cb('D');
  } else if (withinKy() && Y <= 216 && Y >= 175) {
    console.log('Note E');
    cb('E');
  } else if (withinKy() && Y <= 258 && Y >= 217) {
    console.log('Note F');
    cb('F');
  } else if (withinKy() && Y <= 300 && Y >= 259) {
    console.log('Note G');
    cb('G');
  } else if (withinKy() && Y <= 342 && Y >= 301) {
    console.log('Note A');
    cb('A');
  } else if (withinKy() && Y <= 384 && Y >= 343) {
    console.log('Note B');
    cb('B');
  } else {
    cb('none');
  }
};

export default keyboard;
