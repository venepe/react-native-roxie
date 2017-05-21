/**
 * @flow
 */

import {
  PermissionsAndroid,
  Platform,
} from 'react-native';

export default () => {
  if (Platform.Version >= 23) {
    PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      .then((hasPermission) => {
        if (!hasPermission) {
          PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            .then((didAccept) => {
              if (!didAccept) {
                console.error('User refused');
              }
            });
        }
      });
  }
};
