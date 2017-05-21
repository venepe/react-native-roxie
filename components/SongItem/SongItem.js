/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import { getActiveSong } from '../../reducers';
import { deleteSong } from '../../actions';
import styles from './styles';

class SongItem extends Component {
  static propTypes = {
    rowID: PropTypes.number,
    song: PropTypes.shape({
      albumName: PropTypes.string,
      albumArtist: PropTypes.string,
      artist: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
    }),
    activeSong: PropTypes.shape({
      albumName: PropTypes.string,
      albumArtist: PropTypes.string,
      artist: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
    }),
    onPress: PropTypes.func,
    deleteSong: PropTypes.func,
  }

  static defaultProps = {
    rowID: 0,
    song: {},
    activeSong: {},
    onPress: () => {},
    deleteSong: () => {},
  }

  constructor(props) {
    super(props);

    this.deleteSong = this.deleteSong.bind(this);

    this.state = {
      rowID: props.rowID,
      song: props.song,
      activeSong: props.activeSong,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSong) {
      this.setState({ activeSong: nextProps.activeSong });
    }

    if (nextProps.song) {
      this.setState({ song: nextProps.song });
    }
  }


  deleteSong() {
    const uri = this.state.song.uri;
    RNFS.unlink(uri)
      .then(() => {
        this.props.deleteSong({ payload: { uri } });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    let color;
    const rowIDPlus7 = this.state.rowID + 7;
    const remainder = rowIDPlus7 % 7;
    if (remainder === 0) {
      color = '#FF8A80';
    } else if (remainder === 1) {
      color = '#FFD180';
    } else if (remainder === 2) {
      color = '#FFFF8D';
    } else if (remainder === 3) {
      color = '#B9F6CA';
    } else if (remainder === 4) {
      color = '#80D8FF';
    } else if (remainder === 5) {
      color = '#8C9EFF';
    } else if (remainder === 6) {
      color = '#B388FF';
    }

    const right = [
      { text: 'Delete', color: '#FFFFFF', backgroundColor: '#FF1744', onPress: this.deleteSong },
    ];

    const opacity = this.state.song.uri === this.state.activeSong.uri ? 0.7 : 1.0;
    const song = this.state.song || {};

    return (
      <Swipeout right={right} autoClose>
        <TouchableOpacity onPress={() => this.props.onPress(this.state.rowID)}>
          <View style={[styles.card, styles.container, { opacity }]}>
            <View style={styles.infoContainer}>
              <View style={styles.infoSubContainer}>
                <Text style={[styles.title, { color }]}>{song.title}</Text>
                <Text style={[styles.artist, { color }]}>{song.artist}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

const mapStateToProps = state => ({
  activeSong: getActiveSong(state),
});

export default connect(
  mapStateToProps,
  { deleteSong },
)(SongItem);
