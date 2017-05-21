import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 1,
    padding: 10,
    paddingLeft: 15,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    shadowColor: '#FAFAFA',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  title: {
    color: '#FFFF00',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto-Thin',
  },
  artist: {
    color: '#FFFF00',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Thin',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  infoSubContainer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});
