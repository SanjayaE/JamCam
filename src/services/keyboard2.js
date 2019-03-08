// play Synth notes based on key-point (partNum) position

const keyboard = async (pose, cb) => {
    let Y = pose.y;
    let X = pose.x;

    //only trigger within region of keyboard
    let withinKB = function () {
        if (X >= 540 && X <= 640 && (Y >= 0 && Y <= 640)) {
            return true;
        } else {
            cb('movedOut');
        }
    };

    if (withinKB() && Y <= 80) {
        console.log('a2');
        cb('a2');
        // TODO: Update Color of the C key on the DOM
    } else if (withinKB() && Y <= 160 && Y >= 81) {
        console.log('b2');
        cb('b2');
    } else if (withinKB() && Y <= 240 && Y >= 161) {
        console.log('c3');
        cb('c3');
    } else if (withinKB() && Y <= 320 && Y >= 241) {
        console.log('d3');
        cb('d3');
    } else if (withinKB() && Y <= 400 && Y >= 321) {
        console.log('e3');
        cb('e3');
    } else if (withinKB() && Y <= 480 && Y >= 401) {
        console.log('f3');
        cb('f3');
    } else if (withinKB() && Y <= 560 && Y >= 481) {
        console.log('g3');
        cb('g3');
    } else if (withinKB() && Y <= 640 && Y >= 561) {
        console.log('a3');
        cb('a3');
    } else {
        // console.log('none');
        cb('none');
    }
<<<<<<< HEAD
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
=======
>>>>>>> 24d505ea9ec7fca7a6cba749dc0e4fc6e6a380af
};

export default keyboard;
