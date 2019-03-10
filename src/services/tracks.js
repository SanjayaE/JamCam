// play loops based on key-point (partNum) position
const tracks = async (pose, receiveTrackPress) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of loops section
  let within = function () {
    if (X >= 1 && X <= 100 && (Y >= 40 && Y <= 440)) {
      return true;
    } else {
      receiveTrackPress('movedOut');
    }
  };

  if (within() && Y <= 100) {
    console.log('beat1');
    receiveTrackPress('beat1');
  } else if (within() && Y <= 160 && Y >= 101) {
    console.log('beat2');
    receiveTrackPress('beat2');
  } else if (within() && Y <= 220 && Y >= 161) {
    console.log('beat3');
    receiveTrackPress('beat3');
  } else if (within() && Y <= 340 && Y >= 281) {
    console.log('bassline1');
    receiveTrackPress('bassline1');
  } else if (within() && Y <= 400 && Y >= 341) {
    console.log('bassline2');
    receiveTrackPress('bassline2');
  } else if (within() && Y <= 460 && Y >= 401) {
    console.log('bassline3');
    receiveTrackPress('bassline3');
  } else {
    receiveTrackPress('none');
  }
};

export default tracks;
