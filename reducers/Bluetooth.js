/**
 * @flow
 */

import BluetoothTypes from '../constants/BluetoothTypes';

const initialState = {
  connection: {
    peripheralId: null,
    serviceUUID: null,
    characteristicUUID: null,
    values: [],
  },
  isConnected: false,
};

const bluetooth = (state = initialState, action) => {
  switch (action.type) {
    case BluetoothTypes.RESET:
      {
        return { ...state,
          ...initialState,
        };
      }
    case BluetoothTypes.ON_CAPTURE:
      {
        return { ...state,
          connection: { ...action.payload },
        };
      }
    case BluetoothTypes.IS_CONNECTED:
      {
        return { ...state,
          isConnected: action.payload,
        };
      }
    default:
      return state;
  }
};

export default bluetooth;
