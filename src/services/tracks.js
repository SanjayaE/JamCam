// play loops based on key-point (partNum) position
const tracks = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of loops section
  let within = function() {
    if (X >= 1 && X <= 100 && (Y >= 40 && Y <= 440)) {
      return true;
    } else {
      cb('movedOut');
    }
  };

  if (within() && Y <= 100) {
    console.log('button1');
    cb('button1');
  } else if (within() && Y <= 175 && Y >= 109) {
    console.log('button2');
    cb('button2');
  } else if (within() && Y <= 242 && Y >= 176) {
    console.log('button3');
    cb('button3');
  } else if (within() && Y <= 309 && Y >= 243) {
    console.log('button4');
    cb('button4');
  } else if (within() && Y <= 376 && Y >= 310) {
    console.log('button5');
    cb('button5');
  } else if (within() && Y <= 442 && Y >= 377) {
    console.log('button6');
    cb('button6');
  } else {
    cb('none');
  }
};

export default tracks;
