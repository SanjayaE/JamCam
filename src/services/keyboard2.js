// play Synth notes based on key-point (partNum) position

const keyboard = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let withinKB = function() {
    if (X >= 540 && X <= 640 && (Y >= 0 && Y <= 640)) {
      return true;
    } else {
      cb('movedOut');
    }
  };

  if (withinKB() && Y <= 80) {
    console.log('mega_chord1');
    cb('mega_chord1');
    // TODO: Update Color of the C key on the DOM
  } else if (withinKB() && Y <= 160 && Y >= 81) {
    console.log('mega_chord2');
    cb('mega_chord2');
  } else if (withinKB() && Y <= 240 && Y >= 161) {
    console.log('mega_chord3');
    cb('mega_chord3');
  } else if (withinKB() && Y <= 320 && Y >= 241) {
    console.log('mega_chord4');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 400 && Y >= 321) {
    console.log('mega_chord5');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 480 && Y >= 401) {
    console.log('mega_chord6');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 560 && Y >= 481) {
    console.log('mega_chord7');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 640 && Y >= 561) {
    console.log('mega_chord8');
    cb('mega_chord4');
  } else {
    // console.log('none');
    cb('none');
  }
};

export default keyboard;
