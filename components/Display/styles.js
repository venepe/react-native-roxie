import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  subContainer: {
    flex: 1,
  },
  backContainer: {
    flex: 1,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 15,
  },
  backButtonContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    width: 58,
  },
  boxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  superBoxContainer: {
    position: 'absolute',
    bottom: 200,
    top: 10,
    width: window.width,
    backgroundColor: '#212121',
  },
});

export const boxStyles = [
  {
    width: 20,
    height: 40,
    marginLeft: 40,
    backgroundColor: '#FF8A80',
  },
  {
    width: 20,
    height: 40,
    marginRight: 40,
    backgroundColor: '#FF9E80',
  },
  {
    width: 40,
    height: 20,
    marginTop: 40,
    backgroundColor: '#FFD180',
  },
  {
    width: 40,
    height: 20,
    marginBottom: 40,
    backgroundColor: '#FFE57F',
  },
  {
    width: 20,
    height: 80,
    marginLeft: 80,
    backgroundColor: '#FFFF8D',
  },
  {
    width: 20,
    height: 80,
    marginRight: 80,
    backgroundColor: '#F4FF81',
  },
  {
    width: 80,
    height: 20,
    marginTop: 80,
    backgroundColor: '#CCFF90',
  },
  {
    width: 80,
    height: 20,
    marginBottom: 80,
    backgroundColor: '#B9F6CA',
  },
  {
    width: 20,
    height: 120,
    marginLeft: 120,
    backgroundColor: '#A7FFEB',
  },
  {
    width: 20,
    height: 120,
    marginRight: 120,
    backgroundColor: '#84FFFF',
  },
  {
    width: 120,
    height: 20,
    marginTop: 120,
    backgroundColor: '#80D8FF',
  },
  {
    width: 120,
    height: 20,
    marginBottom: 120,
    backgroundColor: '#82B1FF',
  },
  {
    width: 20,
    height: 160,
    marginLeft: 160,
    backgroundColor: '#8C9EFF',
  },
  {
    width: 20,
    height: 160,
    marginRight: 160,
    backgroundColor: '#B388FF',
  },
  {
    width: 160,
    height: 20,
    marginTop: 160,
    backgroundColor: '#EA80FC',
  },
  {
    width: 160,
    height: 20,
    marginBottom: 160,
    backgroundColor: '#AA00FF',
  },
];
