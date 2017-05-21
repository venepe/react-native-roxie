import {
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';

const getMusicDirectory = () => {
  if (Platform.OS === 'android') {
    return RNFS.ExternalStorageDirectoryPath;
  }
  return RNFS.DocumentDirectoryPath;
};

export default {
  getMusicDirectory,
};
