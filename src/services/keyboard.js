//play Synth notes based on key-point (partNum) position

const keyboard = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let withinKB = function () {
    return X >= 540 && X <= 640 && (Y >= 90 && Y <= 385);
  };

  if (withinKB() && Y <= 132) {
    console.log('chord1');
    cb('chord1');
  } else if (withinKB() && Y <= 174 && Y >= 133) {
    console.log('chord2');
    cb('chord2');
  } else if (withinKB() && Y <= 216 && Y >= 175) {
    console.log('chord3');
    cb('chord3');
  } else if (withinKB() && Y <= 258 && Y >= 217) {
    console.log('chord4');
    cb('chord4');
  } else {
    cb('none');
  }
};

export default keyboard;
