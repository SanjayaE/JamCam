/* *****play Synth notes based on key-point (partNum) position ***** */
const loops = async (pose, cb) => {
  let Y = pose.y;
  let X = pose.x;

  //only trigger within region of keyboard
  let within = function() {
    return X >= 1 && X <= 100 && (Y >= 40 && Y <= 442);
  };

  if (within() && Y <= 108) {
    console.log('loop1');
    // cb('loop1');
  } else if (within() && Y <= 175 && Y >= 109) {
    console.log('loop2');
    // cb('loop2');
  } else if (within() && Y <= 242 && Y >= 176) {
    console.log('loop3');
    // cb('loop3');
  } else if (within() && Y <= 309 && Y >= 243) {
    console.log('loop4');
    // cb('loop4');
  } else if (within() && Y <= 376 && Y >= 310) {
    console.log('loop5');
    // cb('loop5');
  } else if (within() && Y <= 442 && Y >= 377) {
    console.log('loop6');
    // cb('loop6');
  } else {
    cb('none');
  }
};

export default loops;
