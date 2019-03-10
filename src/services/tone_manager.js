const Tone = require('tone');

export const chords = new Tone.Players(
  {
    chord1:
      process.env.PUBLIC_URL +
      '/camjam_samples/chord_hits/1st_chord_fmin120.wav',
    chord2:
      process.env.PUBLIC_URL +
      '/camjam_samples/chord_hits/2nd_chord_fmin120.wav',
    chord3:
      process.env.PUBLIC_URL +
      '/camjam_samples/chord_hits/3rd_chord_fmin120.wav',
    chord4:
      process.env.PUBLIC_URL +
      '/camjam_samples/chord_hits/4th_chord_fmin120.wav'
  },
  go
).toMaster();

export const loops = new Tone.Players(
  {
    kick: './camjam_samples/kickdrum_loop120.wav',
    bass: './camjam_samples/arg_bass_line_fmin120.wav',
    clap: './camjam_samples/drum_loop_claps120.wav',
    hat: './camjam_samples/newhatloop_120.wav',
    perc: './camjam_samples/percloop_grainy120.wav',
    vocal: './camjam_samples/vocals_let_me_see_you_move120.wav',
    beat1: './camjam_samples/drumbeat1_120.wav',
    beat2: './camjam_samples/drumbeat2_120.wav',
    beat3: './camjam_samples/drumbeat3_120.wav',
    bassline1: './camjam_samples/bassline1_120.wav',
    bassline2: './camjam_samples/bassline2_120.wav',
    bassline3: './camjam_samples/perc2_120.wav'
  },
  go
).toMaster();

//custom synth sound
var synth = new Tone.Synth().toMaster();
// synth.oscillator.type = 'sine';

//volume adjustments on individual clips
loops.get('bass').volume.value = -8;
loops.get('hat').volume.value = -4;

//starts the beat counter
function go() {
  Tone.Transport.scheduleRepeat(function (time) { }, '1m');
  Tone.Transport.start();
}
//loops wav files together on beat
export function startLoop(name, loopCheck) {
  if (loops.get(name).state === 'started') {
    loops.get(name).stop(Tone.Transport.nextSubdivision('1n'));
    loopCheck(name, false);
  } else {
    loops.get(name).loop = true;
    loops.get(name).start(Tone.Transport.nextSubdivision('1n'));
    loopCheck(name, true);
  }
}

//Only let 1/3 beats or basslines play at once for mode 2
export function switchOtherSoundOff(name) {
  if (name === 'beat1') {
    loops.get('beat2').stop()
    loops.get('beat3').stop()
  } else if (name === 'beat2') {
    loops.get('beat1').stop()
    loops.get('beat3').stop()
  } else if (name === 'beat3') {
    loops.get('beat1').stop()
    loops.get('beat2').stop()
  } else if (name === 'bassline1') {
    loops.get('bassline2').stop()
    loops.get('bassline3').stop()
  } else if (name === 'bassline2') {
    loops.get('bassline1').stop()
    loops.get('bassline3').stop()
  } else if (name === 'bassline3') {
    loops.get('bassline1').stop()
    loops.get('bassline2').stop()
  }
}


//plays sound once on beat
export function playOnce(name) {
  chords.get(name).volume.value = -6;
  chords.get(name).start(Tone.Transport.nextSubdivision('1n'));
}

//play synth note
export function playNote(note) {
  synth.triggerAttackRelease(note, '8n');
}

//noise kill switch
export function stopAudio() {
  loops.stopAll('8n');
  chords.stopAll('8n');
}
