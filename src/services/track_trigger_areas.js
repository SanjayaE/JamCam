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
    receiveTrackPress('beat1');
  } else if (within() && Y <= 160 && Y >= 101) {
    receiveTrackPress('beat2');
  } else if (within() && Y <= 220 && Y >= 161) {
    receiveTrackPress('beat3');
  } else if (within() && Y <= 340 && Y >= 281) {
    receiveTrackPress('bassline1');
  } else if (within() && Y <= 400 && Y >= 341) {
    receiveTrackPress('bassline2');
  } else if (within() && Y <= 460 && Y >= 401) {
    receiveTrackPress('bassline3');
  } else {
    receiveTrackPress('none');
  }
};

export default tracks;
