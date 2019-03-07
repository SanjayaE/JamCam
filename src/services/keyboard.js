// play Synth notes based on key-point (partNum) position

const keyboard = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let withinKB = function () {
    if (X >= 540 && X <= 640 && (Y >= 40 && Y <= 440)) {
      return true
    }
    else {
      cb('moved-out')
    }
  };

  if (withinKB() && Y <= 140) {
    console.log('chord1');
    cb('chord1');
    // TODO: Update Color of the C key on the DOM
  } else if (withinKB() && Y <= 240 && Y >= 141) {
    console.log('chord2');
    cb('chord2');
  } else if (withinKB() && Y <= 340 && Y >= 241) {
    console.log('chord3');
    cb('chord3');
  } else if (withinKB() && Y <= 440 && Y >= 341) {
    console.log('chord4');
    cb('chord4');
  } else {
    cb('none');
  }
};

export default keyboard;
