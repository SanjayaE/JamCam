// play Synth notes based on key-point (partNum) position

const keyboard2 = async (pose, cb) => {
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

    if (withinKB() && Y <= 60) {
        console.log('a2');
        cb('a2');
        // TODO: Update Color of the C key on the DOM
    } else if (withinKB() && Y <= 120 && Y >= 61) {
        console.log('b2');
        cb('b2');
    } else if (withinKB() && Y <= 180 && Y >= 121) {
        console.log('c3');
        cb('c3');
    } else if (withinKB() && Y <= 240 && Y >= 181) {
        console.log('d3');
        cb('d3');
    } else if (withinKB() && Y <= 300 && Y >= 241) {
        console.log('e3');
        cb('e3');
    } else if (withinKB() && Y <= 360 && Y >= 301) {
        console.log('f3');
        cb('f3');
    } else if (withinKB() && Y <= 420 && Y >= 361) {
        console.log('g3');
        cb('g3');
    } else if (withinKB() && Y <= 480 && Y >= 421) {
        console.log('a3');
        cb('a3');
    } else {
        cb('none');
    }
};

export default keyboard2;
