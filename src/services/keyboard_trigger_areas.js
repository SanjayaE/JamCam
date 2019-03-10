// play Synth notes based on key-point (partNum) position

const keyboardTriggerAreas = async (pose, receiveKeyBoardPress) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let withinKB = function () {
    if (X >= 540 && X <= 640 && (Y >= 40 && Y <= 440)) {
      return true;
    } else {
      receiveKeyBoardPress("movedOut");
    }
  };

  if (withinKB() && Y <= 140) {
    receiveKeyBoardPress("chord1");
    console.log("chord1")
  } else if (withinKB() && Y <= 240 && Y >= 141) {
    receiveKeyBoardPress("chord2");
    console.log("chord2")
  } else if (withinKB() && Y <= 340 && Y >= 241) {
    receiveKeyBoardPress("chord3");
    console.log("chord3")
  } else if (withinKB() && Y <= 440 && Y >= 341) {
    receiveKeyBoardPress("chord4");
    console.log("chord4")
  } else {
    receiveKeyBoardPress("none");
  }
};

export default keyboardTriggerAreas;
