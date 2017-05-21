/**
 * @flow
 */

const MusicControl = {

  STATE_PLAYING: 'STATE_PLAYING',
  STATE_PAUSED: 'STATE_PAUSED',
  STATE_ERROR: 'STATE_PAUSED',
  STATE_STOPPED: 'STATE_PAUSED',
  STATE_BUFFERING: 'STATE_PAUSED',

  // Rating is not supported on iOS. This is kept here for compatibility
  RATING_HEART: 0,
  RATING_THUMBS_UP_DOWN: 0,
  RATING_3_STARS: 0,
  RATING_4_STARS: 0,
  RATING_5_STARS: 0,
  RATING_PERCENTAGE: 0,

  setPlayback: () => {},
  updatePlayback: () => {},
  enableBackgroundMode: () => {},
  setNowPlaying: () => {},
  resetNowPlaying: () => {},
  enableControl: () => {},
  handleCommand: () => {},
  on: () => {},
  off: () => {},
};

export default MusicControl;
