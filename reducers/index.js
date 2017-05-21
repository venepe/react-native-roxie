/**
 * @flow
 */

import { combineReducers } from 'redux';
import bluetooth from './Bluetooth';
import library from './Library';
import player from './Player';
import vibe from './Vibe';

export default combineReducers({
  bluetooth,
  library,
  player,
  vibe,
});

export const getBluetoothConnection = state => state.bluetooth.connection;

export const isBluetoothConnected = state => state.bluetooth.isConnected;

export const getSongs = state => state.library.songs;

export const getActiveSong = state => state.player.song;

export const getIsPlaying = state => state.player.isPlaying;

export const getElapsedTime = state => state.player.elapsedTime;

export const getVibeValue = state => state.vibe.value;
