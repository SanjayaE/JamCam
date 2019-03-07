/* *****play Synth notes based on key-point (partNum) position ***** */
const keyboard = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let withinKy = function () {
    return X >= 540 && X <= 640 && (Y >= 90 && Y <= 385);
  };

  if (withinKy() && Y <= 132) {
    console.log('chord1');
    cb('chord1');
    // TODO: Update Color of the C key on the DOM
  } else if (withinKy() && Y <= 174 && Y >= 133) {
    console.log('chord2');
    cb('chord2');
  } else if (withinKy() && Y <= 216 && Y >= 175) {
    console.log('chord3');
    cb('chord3');
  } else if (withinKy() && Y <= 258 && Y >= 217) {
    console.log('chord4');
    cb('chord4');
    // } else if (withinKy() && Y <= 300 && Y >= 259) {
    //   console.log('Note G');
    //   cb('G');
    // } else if (withinKy() && Y <= 342 && Y >= 301) {
    //   console.log('Note A');
    //   cb('A');
    // } else if (withinKy() && Y <= 384 && Y >= 343) {
    //   console.log('Note B');
    //   cb('B');
  } else {
    cb('none');
  }
};

export default keyboard;
