/**
 * @flow
 */

import PlayerTypes from '../constants/PlayerTypes';

const initialState = {
  song: {},
  isPlaying: false,
  elapsedTime: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PlayerTypes.UPDATE_PLAYER:
      {
        return { ...state,
          ...action.payload,
        };
      }
    case PlayerTypes.UPDATE_ELAPSED_TIME:
      {
        const elapsedTime = action.payload.elapsedTime;
        return { ...state, elapsedTime };
      }
    case PlayerTypes.PAUSE_SONG:
      {
        const isPlaying = false;
        return { ...state,
          isPlaying,
        };
      }
    case PlayerTypes.STOP_SONG:
      {
        return { ...state,
          ...initialState,
        };
      }
    default:
      return state;
  }
};

export default reducer;
