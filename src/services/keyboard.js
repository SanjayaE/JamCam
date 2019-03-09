// play Synth notes based on key-point (partNum) position

const keyboard = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let withinKB = function () {
    if (X >= 540 && X <= 640 && (Y >= 40 && Y <= 440)) {
      return true;
    } else {
      cb("movedOut");
    }
  };

  if (withinKB() && Y <= 140) {
    cb("chord1");
  } else if (withinKB() && Y <= 240 && Y >= 141) {
    cb("chord2");
  } else if (withinKB() && Y <= 340 && Y >= 241) {
    cb("chord3");
  } else if (withinKB() && Y <= 440 && Y >= 341) {
    cb("chord4");
  } else {
    cb("none");
  }
};

export default keyboard;
