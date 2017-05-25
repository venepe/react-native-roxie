import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    padding: 5,
  },
  text: {
    color: '#FF8A80',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto-Thin',
    textAlign: 'center',
  },
});
