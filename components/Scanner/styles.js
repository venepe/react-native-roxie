import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 15,
    padding: 5,
  },
});
