import reducer from '../../reducers/Library';
import LibraryTypes from '../../constants/LibraryTypes';

const mockSongs = [
  {
    albumName: 'Lonerism',
    albumArtist: 'Tame Impala',
    artist: 'Tame Impala',
    title: 'Feels Like We Only Go Backwards',
    uri: 'going_backwards',
    duration: 211,
  },
  {
    albumName: 'Native',
    albumArtist: 'OneRepublic',
    artist: 'Alesso Vs. OneRepublic',
    title: 'If I Lose Myself',
    uri: 'lose_myself',
    duration: 215,
  }];

describe('library reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      songs: [],
    });
  });

  it('should handle SET_SONGS', () => {
    expect(
      reducer(undefined, {
        type: LibraryTypes.SET_SONGS,
        payload: {
          songs: mockSongs,
        },
      }),
    ).toEqual({
      songs: mockSongs,
    });
  });

  it('should handle DELETE_SONG', () => {
    const state = reducer(undefined, {
      type: LibraryTypes.SET_SONGS,
      payload: {
        songs: mockSongs,
      },
    });

    expect(
      reducer(state, {
        type: LibraryTypes.DELETE_SONG,
        payload: {
          uri: mockSongs[0].uri,
        },
      }),
    ).toEqual({
      songs: [mockSongs[1]],
    });
  });
});
