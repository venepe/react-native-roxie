

import BluetoothTypes from '../constants/BluetoothTypes';
import PlayerTypes from '../constants/PlayerTypes';
import LibraryTypes from '../constants/LibraryTypes';
import VibeTypes from '../constants/VibeTypes';
import Player from '../helpers/Player';

export const resetBluetooth = () => ({
  type: BluetoothTypes.RESET,
});

export const onCapture = payload => ({
  type: BluetoothTypes.ON_CAPTURE,
  ...payload,
});

export const isConnected = payload => ({
  type: BluetoothTypes.IS_CONNECTED,
  ...payload,
});

export const deleteSong = payload => ({
  type: LibraryTypes.DELETE_SONG,
  ...payload,
});

export const setSongs = payload => ({
  type: LibraryTypes.SET_SONGS,
  ...payload,
});

export const playSong = payload => (dispatch) => {
  Player.play(payload.payload.song, 0, () => {
    dispatch(nextSong());
  });
  dispatch(updatePlayer({ payload: { ...payload.payload, isPlaying: true, elapsedTime: 0 } }));
};

export const nextSong = () => (dispatch, getState) => {
  const { library, player } = getState();
  const songs = library.songs;
  const activeSong = player.song;
  const activeIndex = songs.findIndex(song => song.uri === activeSong.uri);
  let nextIndex = 0;
  if (activeIndex < songs.length - 1) {
    nextIndex = activeIndex + 1;
  }
  const song = songs[nextIndex];
  dispatch(playSong({ payload: { song } }));
};

export const previousSong = () => (dispatch, getState) => {
  const { library, player } = getState();
  const songs = library.songs;
  const activeSong = player.song;
  let activeIndex = songs.findIndex(song => song.uri === activeSong.uri);
  const currentTime = player.elapsedTime;
  const elapsedTime = 0;
  if (currentTime < 10) {
    if (activeIndex === 0) {
      activeIndex = songs.length - 1;
    } else {
      activeIndex -= 1;
    }
    dispatch(playSong({ payload: { song: songs[activeIndex] } }));
  } else {
    dispatch(seekAndResumeSong({ payload: { elapsedTime } }));
  }
};

export const pauseSong = () => {
  Player.pause();
  return {
    type: PlayerTypes.PAUSE_SONG,
  };
};

export const resumeSong = () => (dispatch, getState) => {
  const { player } = getState();
  Player.resume((player.elapsedTime), () => {
    dispatch(nextSong());
  });
  dispatch(updatePlayer({ payload: { isPlaying: true } }));
};

export const stopSong = () => {
  Player.stop();
  return {
    type: PlayerTypes.STOP_SONG,
  };
};

export const updateElapsedTime = payload => ({
  type: PlayerTypes.UPDATE_ELAPSED_TIME,
  ...payload,
});

const updatePlayer = payload => ({
  type: PlayerTypes.UPDATE_PLAYER,
  ...payload,
});

export const seekAndResumeSong = payload => (dispatch) => {
  Player.seekToTimeAndPlay(payload.payload.elapsedTime, () => {
    dispatch(nextSong());
  });
  dispatch(updatePlayer({ payload: { ...payload.payload, isPlaying: true } }));
};

export const emitVibe = payload => ({
  type: VibeTypes.EMIT_VIBE,
  ...payload,
});

const actions = {
  resetBluetooth,
  onCapture,
  isConnected,
  deleteSong,
  setSongs,
  nextSong,
  previousSong,
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  updateElapsedTime,
  seekAndResumeSong,
  emitVibe,
};

export default actions;
