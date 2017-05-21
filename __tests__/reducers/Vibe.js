import reducer from '../../reducers/Vibe';
import VibeTypes from '../../constants/VibeTypes';

describe('vibe reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      value: null,
    });
  });

  it('should handle EMIT_VIBE', () => {
    expect(
      reducer(undefined, {
        type: VibeTypes.EMIT_VIBE,
        payload: {
          value: 4,
        },
      }),
    ).toEqual({
      value: 4,
    });
  });
});
