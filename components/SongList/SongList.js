/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Navigator,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import MusicControl from 'react-native-music-control';
import { getSongs, getActiveSong } from '../../reducers';
import { nextSong, previousSong, playSong, pauseSong, resumeSong } from '../../actions';
import Display from '../Display';
import SongItem from '../SongItem';
import styles from './styles';

class SongList extends Component {

  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.shape({
      albumName: PropTypes.string,
      albumArtist: PropTypes.string,
      artist: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
    })),
    activeSong: PropTypes.shape({
      albumName: PropTypes.string,
      albumArtist: PropTypes.string,
      artist: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
      duration: PropTypes.number,
    }),
    nextSong: PropTypes.func,
    stopSong: PropTypes.func,
    previousSong: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    playSong: PropTypes.func,
    navigator: PropTypes.shape({
      pop: PropTypes.func,
    }),
  }

  static defaultProps = {
    songs: [],
    activeSong: {},
    nextSong: () => {},
    stopSong: () => {},
    previousSong: () => {},
    resumeSong: () => {},
    pauseSong: () => {},
    playSong: () => {},
    navigator: {},
  }

  static getUpdatedState(songs) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return {
      dataSource: ds.cloneWithRows(songs),
    };
  }

  constructor(props) {
    super(props);

    this.getSetupState = this.getSetupState.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onPressRow = this.onPressRow.bind(this);

    this.state = this.getSetupState();
  }

  componentDidMount() {
    MusicControl.on('play', () => {
      this.props.resumeSong();
    });

    MusicControl.on('pause', () => {
      this.props.pauseSong();
    });

    MusicControl.on('stop', () => {
      this.props.stopSong();
    });

    MusicControl.on('nextTrack', () => {
      this.props.nextSong();
    });

    MusicControl.on('previousTrack', () => {
      this.props.previousSong();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songs) {
      this.setState(SongList.getUpdatedState(nextProps.songs));
    }
  }

  onPressRow(selectedIndex) {
    const navigator = this.props.navigator;
    const song = this.props.songs[selectedIndex];
    if (this.props.activeSong.uri !== song.uri) {
      this.props.playSong({ payload: { song } });
    }
    navigator.push({
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      component: Display,
      passProps: { navigator },
    });
  }

  getSetupState() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return {
      hasNextPage: false,
      dataSource: ds.cloneWithRows(this.props.songs),
    };
  }

  // // rowData is an array of projects
  renderRow(rowData, sectionID, rowID) {
    const id = parseInt(rowID, 10);
    return (
      <SongItem song={rowData} rowID={id} onPress={this.onPressRow} />
    );
  }

  render() {
    let renderComponent;
    if (this.props.songs.length > 0) {
      renderComponent = (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
        />
      );
    } else {
      renderComponent = (<View />);
    }
    return renderComponent;
  }
}

const mapStateToProps = state => ({
  songs: getSongs(state),
  activeSong: getActiveSong(state),
});

export default connect(
  mapStateToProps,
  { nextSong, previousSong, playSong, pauseSong, resumeSong },
)(SongList);
