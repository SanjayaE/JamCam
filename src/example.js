receiveTrackPress = button => {
  let tracks = { ...this.state.tracks };
  if (
    button !== 'none' &&
    button !== 'movedOut' &&
    this.state.previousTrackButton !== button
  ) {
    if (button === 'beat1' || button === 'beat2' || button === 'beat3') {
      if (tracks[button].active) {
        tracks[button].active = false;
      } else if (!tracks[button].active) {
        tracks.beat1 = false;
        tracks.beat2 = false;
        tracks.beat3 = false;
        tracks[button].active = true;
      }
    } else if (
      button === 'bassline1' ||
      button === 'baseline2' ||
      button === 'baseline3'
    ) {
      if (tracks[button].active) {
        tracks[button].active = false;
      } else if (!tracks[button].active) {
        tracks.bassline1 = false;
        tracks.bassline2 = false;
        tracks.bassline3 = false;
        tracks[button].active = true;
      }
    }
  }
  if (button === 'movedOut') {
    tracks.previousTrackButton = 'none';
  }
};
