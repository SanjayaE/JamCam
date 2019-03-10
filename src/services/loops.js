// play loops based on key-point (partNum) position
const loopsSection = async (pose, receiveLoopPress) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of loops section
  let within = function () {
    if (X >= 1 && X <= 100 && (Y >= 40 && Y <= 442)) {
      return true;
    } else {
      receiveLoopPress("movedOut");
    }
  };

  if (within() && Y <= 108) {
    // console.log('kick');
    receiveLoopPress("kick");
  } else if (within() && Y <= 175 && Y >= 109) {
    // console.log('bass');
    receiveLoopPress("bass");
  } else if (within() && Y <= 242 && Y >= 176) {
    // console.log('clap');
    receiveLoopPress("clap");
  } else if (within() && Y <= 309 && Y >= 243) {
    // console.log('hat');
    receiveLoopPress("hat");
  } else if (within() && Y <= 376 && Y >= 310) {
    // console.log('perc');
    receiveLoopPress("perc");
  } else if (within() && Y <= 442 && Y >= 377) {
    // console.log('vocal');
    receiveLoopPress("vocal");
  } else {
    receiveLoopPress("none");
  }
};

export default loopsSection;
