/**
 * @flow
 */

import LibraryTypes from '../constants/LibraryTypes';

const initialState = {
  songs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LibraryTypes.DELETE_SONG:
      {
        const songs = state.songs.filter(song => song.uri !== action.payload.uri);
        return { ...state,
          songs,
        };
      }
    case LibraryTypes.SET_SONGS:
      {
        return { ...state,
          ...action.payload,
        };
      }
    default:
      return state;
  }
};

export default reducer;
