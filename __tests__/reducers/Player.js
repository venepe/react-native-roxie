import reducer from '../../reducers/Player';
import PlayerTypes from '../../constants/PlayerTypes';

const mockSong = {
  albumName: 'Lonerism',
  albumArtist: 'Tame Impala',
  artist: 'Tame Impala',
  title: 'Feels Like We Only Go Backwards',
  uri: 'going_backwards',
  duration: 211,
};

const getPlayingState = () => {
  return reducer(undefined, {
    type: PlayerTypes.UPDATE_PLAYER,
    payload: {
      song: mockSong,
      isPlaying: true,
      elapsedTime: 1,
    },
  });
};

describe('player reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      song: {},
      isPlaying: false,
      elapsedTime: 0,
    });
  });

  it('should handle UPDATE_PLAYER', () => {
    expect(getPlayingState()).toEqual({
      song: mockSong,
      isPlaying: true,
      elapsedTime: 1,
    });
  });

  it('should handle UPDATE_ELAPSED_TIME', () => {
    const state = getPlayingState();

    expect(
      reducer(state, {
        type: PlayerTypes.UPDATE_ELAPSED_TIME,
        payload: {
          elapsedTime: 42,
        },
      }),
    ).toEqual({
      song: mockSong,
      isPlaying: true,
      elapsedTime: 42,
    });
  });

  it('should handle PAUSE_SONG', () => {
    const state = getPlayingState();

    expect(
      reducer(state, {
        type: PlayerTypes.PAUSE_SONG,
      }),
    ).toEqual({
      song: mockSong,
      isPlaying: false,
      elapsedTime: 1,
    });
  });

  it('should handle STOP_SONG', () => {
    const state = getPlayingState();

    expect(
      reducer(state, {
        type: PlayerTypes.STOP_SONG,
      }),
    ).toEqual({
      song: {},
      isPlaying: false,
      elapsedTime: 0,
    });
  });
});
