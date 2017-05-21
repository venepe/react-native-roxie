import reducer from '../../reducers/Bluetooth';
import BluetoothTypes from '../../constants/BluetoothTypes';

describe('bluetooth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}),
    ).toEqual({
      connection: {
        peripheralId: null,
        serviceUUID: null,
        characteristicUUID: null,
        values: [],
      },
      isConnected: false,
    });
  });

  it('should handle ON_CAPTURE', () => {
    expect(
      reducer(undefined, {
        type: BluetoothTypes.ON_CAPTURE,
        payload: {
          peripheralId: 'peripheralId',
          serviceUUID: 'serviceUUID',
          characteristicUUID: 'characteristicUUID',
          values: [
            0,
            1,
          ],
        },
      }),
    ).toEqual({
      connection: {
        peripheralId: 'peripheralId',
        serviceUUID: 'serviceUUID',
        characteristicUUID: 'characteristicUUID',
        values: [
          0,
          1,
        ],
      },
      isConnected: false,
    });
  });

  it('should handle RESET', () => {
    expect(
      reducer({
        connection: {
          peripheralId: 'peripheralId',
          serviceUUID: 'serviceUUID',
          characteristicUUID: 'characteristicUUID',
          values: [
            0,
            1,
          ],
        },
        isConnected: false,
      }, {
        type: BluetoothTypes.RESET,
      }),
    ).toEqual({
      connection: {
        peripheralId: null,
        serviceUUID: null,
        characteristicUUID: null,
        values: [],
      },
      isConnected: false,
    });
  });

  it('should handle IS_CONNECTED', () => {
    expect(
      reducer(undefined, {
        type: BluetoothTypes.IS_CONNECTED,
        payload: true,
      }),
    ).toEqual({
      connection: {
        peripheralId: null,
        serviceUUID: null,
        characteristicUUID: null,
        values: [],
      },
      isConnected: true });
  });
});
