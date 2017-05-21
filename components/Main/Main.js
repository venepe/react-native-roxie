/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  NativeAppEventEmitter,
  Navigator,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import BleManager from 'react-native-ble-manager';
import MusicControl from 'react-native-music-control';
import base64 from 'base-64';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import RNSound from 'react-native-sound';
import RNMusicMetadata from 'react-native-music-metadata';
import Display from '../Display';
import SongList from '../SongList';
import Scanner from '../Scanner';
import Intro from '../Intro';
import { getBluetoothConnection, isBluetoothConnected, getActiveSong } from '../../reducers';
import { setSongs, emitVibe, isConnected, updateElapsedTime, resetBluetooth } from '../../actions';
import { getIndexFromPercent, sortByTitle } from '../../utilities';
import Paths from '../../helpers/Paths';
import styles from './styles';
import seekPermissions from './permissions';

class Main extends Component {

  static propTypes = {
    connection: PropTypes.shape({
      peripheralId: PropTypes.string,
      serviceUUID: PropTypes.string,
      characteristicUUID: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.any),
    }).isRequired,
    isBluetoothConnected: PropTypes.bool,
    emitVibe: PropTypes.func,
    updateElapsedTime: PropTypes.func,
    isConnected: PropTypes.func,
    setSongs: PropTypes.func,
    resetBluetooth: PropTypes.func,
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
    activeSong: PropTypes.shape({
      albumName: PropTypes.string,
      albumArtist: PropTypes.string,
      artist: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
      duration: PropTypes.number,
    }),
  }

  static defaultProps = {
    connection: {},
    isBluetoothConnected: false,
    emitVibe: () => {},
    updateElapsedTime: () => {},
    isConnected: () => {},
    setSongs: () => {},
    resetBluetooth: () => {},
    navigator: {
      push: () => {},
    },
    activeSong: {},
  }

  constructor(props) {
    super(props);

    this.writeWithoutResponse = this.writeWithoutResponse.bind(this);

    this.state = {
      ble: null,
      connection: props.connection,
      isBluetoothConnected: props.isBluetoothConnected,
      hasSongs: true,
    };
  }

  componentDidMount() {
    BleManager.start({ showAlert: false });

    RNSound.setCategory('Playback');
    RNSound.enableWaveform(true);
    RNSound.enableProgress(true);

    RNSound.onWaveform((payload) => {
      this.writeWithoutResponse(payload.intensity);
      this.props.emitVibe({ payload: { value: payload.intensity } });
    });

    RNSound.onProgress((payload) => {
      this.props.updateElapsedTime({ payload: { elapsedTime: payload.progress } });
    });

    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', false);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableBackgroundMode(true);

    NativeAppEventEmitter
        .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);

    seekPermissions();
    this.getFiles(Paths.getMusicDirectory())
      .then((files) => {
        const uris = files.map(res => res.path);
        // stat the first file
        RNMusicMetadata.getMetadata(uris)
          .then((tracks) => {
            const songs = sortByTitle(tracks);
            let hasSongs;
            this.props.setSongs({ payload: { songs } });
            if (songs.length > 0) {
              hasSongs = true;
            } else {
              hasSongs = false;
            }
            this.setState({ hasSongs });
          });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });

    if (nextProps.connection.peripheralId) {
      setImmediate(() => this.connect());
    }
  }

  getFiles(path) {
    return RNFS.readDir(path)
      .then(results => Promise.resolve(results))
      .then((results) => {
        const promises = [];
        results.forEach((res) => {
          if (res.isDirectory()) {
            promises.push(this.getFiles(res.path));
          } else if (res.path.match(/\.(?:mp3|m4a)$/i)) {
            promises.push(Promise.resolve(res));
          }
        });
        return Promise.all(promises);
      })
      .then((results) => {
        const flatten = [].concat([], ...results);
        return Promise.resolve(flatten);
      })
      .catch((err) => {
        console.error(err.message, err.code);
      });
  }

  getNowPlayingButton() {
    let rightButton;
    if (this.props.activeSong.uri) {
      rightButton = {
        title: 'Now Playing',
        handler: () => {
          this.nowPlaying();
        },
        tintColor: '#F5F5F5',
      };
    }
    return rightButton;
  }

  handleDiscoverPeripheral(data) {
    this.setState({ ble: data });
  }

  connect() {
    BleManager.connect(this.state.connection.peripheralId)
      .then((peripheralInfo) => {
        // Success code
        // eslint-disable-next-line no-console
        console.log(peripheralInfo);
        this.props.isConnected({ payload: true });
      })
      .catch((error) => {
        // Failure code
        console.error(error);
        this.props.isConnected({ payload: false });
      });
  }

  disconnect() {
    BleManager.disconnect(this.state.connection.peripheralId)
      .then(() => {
        // Success code
        this.props.resetBluetooth();
      })
      .catch((error) => {
        // Failure code
        this.props.isConnected({ payload: true });
        console.error(error);
      });
  }

  writeWithoutResponse(value) {
    if (this.state.isBluetoothConnected) {
      const connection = this.state.connection;
      const values = connection.values;
      const maxValue = values.length;
      const index = getIndexFromPercent(value, maxValue);
      const payload = values[index];
      const data = base64.encode(payload);

      BleManager.writeWithoutResponse(connection.peripheralId, connection.serviceUUID,
                                        connection.characteristicUUID, data)
        .then(() => {
          // Success code
          // eslint-disable-next-line no-console
          console.log(`Wrote: ${data}`);
        })
        .catch((error) => {
          // Failure code
          console.error(error);
        });
    }
  }

  toggleBluetooth() {
    if (this.state.isBluetoothConnected) {
      this.disconnect();
    } else {
      const navigator = this.props.navigator;
      this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        component: Scanner,
        passProps: { navigator },
      });
    }
  }

  nowPlaying() {
    const navigator = this.props.navigator;
    navigator.push({
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      component: Display,
      passProps: { navigator },
    });
  }

  renderBody() {
    const navigator = this.props.navigator;
    let bodyComponent;
    if (this.state.hasSongs) {
      bodyComponent = (<SongList navigator={navigator} />);
    } else {
      bodyComponent = (<Intro navigator={navigator} />);
    }

    return bodyComponent;
  }

  render() {
    const title = this.state.isBluetoothConnected === true ? 'Disconnect' : 'Connect';
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'Roxie', tintColor: '#F5F5F5' }}
          tintColor="#000D11"
          statusBar={{ style: 'light-content' }}
          leftButton={{
            title,
            handler: () => {
              this.toggleBluetooth();
            },
            tintColor: '#F5F5F5',
          }}
          rightButton={this.getNowPlayingButton()}
        />
        <View style={styles.bodyContainer}>
          { this.renderBody() }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  connection: getBluetoothConnection(state),
  isBluetoothConnected: isBluetoothConnected(state),
  activeSong: getActiveSong(state),
});

export default connect(
  mapStateToProps,
  { setSongs, emitVibe, isConnected, updateElapsedTime, resetBluetooth },
)(Main);
