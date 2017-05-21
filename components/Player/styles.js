import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  track: {
    height: 4,
    borderRadius: 1,
    marginTop: -4,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  sliderContainer: {
    width: window.width,
    backgroundColor: 'transparent',
  },
  timerContainer: {
    flex: 0.5,
    flexDirection: 'row',
    paddingTop: 8,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  timer: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Thin',
    margin: 5,
  },
  skip: {
    marginTop: 10,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  info: {
    color: '#FAFAFA',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto-Thin',
    backgroundColor: 'transparent',
  },
  skipPrevious: {
    flex: 1,
    alignItems: 'flex-end',
  },
  play: {
    flex: 1,
    alignItems: 'center',
  },
  skipNext: {
    flex: 1,
    alignItems: 'flex-start',
  },
  controlButton: {
    backgroundColor: 'transparent',
  },
});
