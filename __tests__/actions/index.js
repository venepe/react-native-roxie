import thunk from 'redux-thunk'
import * as actions from '../../actions';
import BluetoothTypes from '../../constants/BluetoothTypes';
import LibraryTypes from '../../constants/LibraryTypes';
import PlayerTypes from '../../constants/PlayerTypes';
import VibeTypes from '../../constants/VibeTypes';
import configureStore from 'redux-mock-store'

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const mockSong = {
  albumName: 'Lonerism',
  albumArtist: 'Tame Impala',
  artist: 'Tame Impala',
  title: 'Feels Like We Only Go Backwards',
  uri: 'going_backwards',
  duration: 211,
};

const mockSong1 = {
  albumName: 'Native',
  albumArtist: 'OneRepublic',
  artist: 'Alesso Vs. OneRepublic',
  title: 'If I Lose Myself',
  uri: 'lose_myself',
  duration: 215,
};

describe('actions', () => {
  it('should create an action to capture the bluetooth data', () => {
    const connection = {
      peripheralId: null,
      serviceUUID: null,
      characteristicUUID: null,
    };
    const expectedAction = {
      type: BluetoothTypes.ON_CAPTURE,
      ...connection,
    };
    expect(actions.onCapture(connection)).toEqual(expectedAction);
  });

  it('should create an action to reset the bluetooth data', () => {
    const expectedAction = {
      type: BluetoothTypes.RESET,
    };
    expect(actions.resetBluetooth()).toEqual(expectedAction);
  });

  it('should create an action to toggle when bluetooth is connected', () => {
    const expectedAction = {
      type: BluetoothTypes.IS_CONNECTED,
    };
    expect(actions.isConnected()).toEqual(expectedAction);
  });

  it('should create an action to delete a song', () => {
    const expectedAction = {
      type: LibraryTypes.DELETE_SONG,
      ...mockSong,
    };
    expect(actions.deleteSong(mockSong)).toEqual(expectedAction);
  });

  it('should create an action to set many songs', () => {
    const mockSongs = [mockSong];
    const expectedAction = {
      type: LibraryTypes.SET_SONGS,
      ...mockSongs,
    };
    expect(actions.setSongs(mockSongs)).toEqual(expectedAction);
  });

  it('should create an action to play the next song', () => {
    const store = mockStore({ library: { songs: [mockSong, mockSong1] }, player: { song: mockSong } })
    const expectedActions = [
        PlayerTypes.UPDATE_PLAYER,
    ];
    store.dispatch(actions.nextSong());
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('should create an action to play the previous song', () => {
    const store = mockStore({ library: { songs: [mockSong, mockSong1] }, player: { song: mockSong } })
    const expectedActions = [
        PlayerTypes.UPDATE_PLAYER,
    ];
    store.dispatch(actions.previousSong());
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('should create an action to play the song at the selected index', () => {
    const store = mockStore({ library: { songs: [mockSong, mockSong1] }, player: { song: mockSong } })
    const expectedActions = [
        PlayerTypes.UPDATE_PLAYER,
    ];
    store.dispatch(actions.playSong({ payload: { song: mockSong } }));
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('should create an action to pause a song', () => {
    const expectedAction = {
      type: PlayerTypes.PAUSE_SONG,
    };
    expect(actions.pauseSong()).toEqual(expectedAction);
  });

  it('should create an action to stop a song', () => {
    const expectedAction = {
      type: PlayerTypes.STOP_SONG,
    };
    expect(actions.stopSong()).toEqual(expectedAction);
  });

  it('should create an action to update the elapsed time', () => {
    const elapsedTime = 42;
    const expectedAction = {
      type: PlayerTypes.UPDATE_ELAPSED_TIME,
      elapsedTime,
    };
    expect(actions.updateElapsedTime({ elapsedTime })).toEqual(expectedAction);
  });

  it('should create an action to seek and resume a song', () => {
    const store = mockStore({ library: { songs: [mockSong, mockSong1] }, player: { song: mockSong } })
    const expectedActions = [
        PlayerTypes.UPDATE_PLAYER,
    ];
    store.dispatch(actions.seekAndResumeSong({ payload: { song: mockSong } }));
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('should create an action to emit a vibration', () => {
    const value = 1;
    const expectedAction = {
      type: VibeTypes.EMIT_VIBE,
      value,
    };
    expect(actions.emitVibe({ value })).toEqual(expectedAction);
  });
});
