/**
 * @flow
 */

import VibeTypes from '../constants/VibeTypes';

const initialState = {
  value: null,
};

const vibe = (state = initialState, action) => {
  switch (action.type) {
    case VibeTypes.EMIT_VIBE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default vibe;
