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

  if (withinKB() && Y <= 60) {
    console.log('mega_chord1');
    cb('mega_chord1');
    // TODO: Update Color of the C key on the DOM
  } else if (withinKB() && Y <= 120 && Y >= 61) {
    console.log('mega_chord2');
    cb('mega_chord2');
  } else if (withinKB() && Y <= 180 && Y >= 121) {
    console.log('mega_chord3');
    cb('mega_chord3');
  } else if (withinKB() && Y <= 240 && Y >= 181) {
    console.log('mega_chord4');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 300 && Y >= 241) {
    console.log('mega_chord5');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 360 && Y >= 301) {
    console.log('mega_chord6');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 420 && Y >= 361) {
    console.log('mega_chord7');
    cb('mega_chord4');
  } else if (withinKB() && Y <= 480 && Y >= 421) {
    console.log('mega_chord8');
    cb('mega_chord4');
  } else {
    // console.log('none');
    cb('none');
  }
};

export default keyboard;
