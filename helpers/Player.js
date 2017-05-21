/**
 * @flow
 */

import MusicControl from 'react-native-music-control';
import RNSound from 'react-native-sound';

let sound = {
  play: () => {},
  pause: () => {},
  stop: () => {},
  setCurrentTime: () => {},
};

const play = (song, elapsedTime = 0, done) => {
  MusicControl.setNowPlaying({
    state: MusicControl.STATE_PLAYING,
    title: song.title,
    artist: song.artist,
    album: song.albumName,
    duration: song.duration,
    elapsedTime,
  });
  const uri = song.uri.replace(RNSound.DOCUMENT, '');
  sound.stop();
  sound = new RNSound(uri, RNSound.DOCUMENT, (error) => {
    if (error) {
      console.error('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    sound.play((success) => {
      if (success) {
        done();
      } else {
        console.error('playback failed due to audio decoding errors');
      }
    });
  });
};

const seekToTimeAndPlay = (elapsedTime = 0, done) => {
  MusicControl.updatePlayback({
    state: MusicControl.STATE_PLAYING,
    elapsedTime,
  });
  sound.setCurrentTime(elapsedTime);
  sound.play((success) => {
    if (success) {
      done();
    } else {
      console.error('playback failed due to audio decoding errors');
    }
  });
};

const stop = () => {
  MusicControl.updatePlayback({
    state: MusicControl.STATE_STOPPED,
    elapsedTime: 0,
  });
  sound.stop();
};

const pause = (elapsedTime) => {
  MusicControl.updatePlayback({
    state: MusicControl.STATE_PAUSED,
    elapsedTime,
  });
  sound.pause();
};

const resume = (elapsedTime, done) => {
  MusicControl.updatePlayback({
    state: MusicControl.STATE_PLAYING,
    elapsedTime,
  });
  sound.play((success) => {
    if (success) {
      done();
    } else {
      console.error('playback failed due to audio decoding errors');
    }
  });
};

export default {
  play,
  seekToTimeAndPlay,
  stop,
  pause,
  resume,
};
