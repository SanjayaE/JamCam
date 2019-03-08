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
  } else if (within() && Y <= 160 && Y >= 101) {
    console.log('button2');
    cb('button2');
  } else if (within() && Y <= 220 && Y >= 161) {
    console.log('button3');
    cb('button3');
  } else if (within() && Y <= 340 && Y >= 281) {
    console.log('button4');
    cb('button4');
  } else if (within() && Y <= 400 && Y >= 341) {
    console.log('button5');
    cb('button5');
  } else if (within() && Y <= 460 && Y >= 401) {
    console.log('button6');
    cb('button6');
  } else {
    cb('none');
  }
};

export default tracks;
