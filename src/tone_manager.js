const Tone = require('tone');

var chords = new Tone.Players({
    chord1: process.env.PUBLIC_URL + "/camjam_samples/chord_hits/1st_chord_fmin120.wav",
    chord2: process.env.PUBLIC_URL + "/camjam_samples/chord_hits/2nd_chord_fmin120.wav",
    chord3: process.env.PUBLIC_URL + "/camjam_samples/chord_hits/3rd_chord_fmin120.wav",
    chord4: process.env.PUBLIC_URL + "/camjam_samples/chord_hits/4th_chord_fmin120.wav",
}, go).toMaster();

var loops = new Tone.Players({
    kick: "./camjam_samples/kickdrum_loop120.wav",
    bass: "./camjam_samples/arg_bass_line_fmin120.wav",
    clap: "./camjam_samples/drum_loop_claps120.wav",
    hat: "./camjam_samples/newhatloop_120.wav",
    perc: "./camjam_samples/percloop_grainy120.wav",
    vocal: "./camjam_samples/vocals_let_me_see_you_move120.wav"
}, go).toMaster();

//custom synth sound
var synth = new Tone.Synth().toMaster().oscillator.type = 'sine';

//volume adjustments on individual clips
loops.get('bass').volume.value = -8;
loops.get('hat').volume.value = -4;

//starts the beat counter
function go() {
    Tone.Transport.scheduleRepeat(function (time) {
        console.log(time)
    }, "1m")
    Tone.Transport.start();
}
//loops wav files together on beat
export function startLoop(name) {

    if (loops.get(name).state === "started") {
        console.log('stop', name)
        loops.get(name).stop(Tone.Transport.nextSubdivision("1n"));
    } else {
        console.log('start', name)
        loops.get(name).loop = true;
        loops.get(name).start(Tone.Transport.nextSubdivision("1n"))
    }
}

//plays sound once on beat
export function playOnce(name) {

    chords.get(name).volume.value = -6;
    chords.get(name).start(Tone.Transport.nextSubdivision("1n"))
}

//start audio conext incase it stops to prevent chrome from stopping sounds
function audioContext() {
    if (Tone.context.state !== 'running') Tone.context.resume();
}
