/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { nextSong, previousSong, pauseSong, resumeSong, seekAndResumeSong } from '../../actions';
import { getActiveSong, getIsPlaying, getElapsedTime } from '../../reducers';
import styles from './styles';

class Player extends Component {
  static propTypes = {
    activeSong: PropTypes.shape({
      albumName: PropTypes.string,
      albumArtist: PropTypes.string,
      artist: PropTypes.string,
      title: PropTypes.string,
      uri: PropTypes.string,
      duration: PropTypes.number,
    }),
    isPlaying: PropTypes.bool,
    elapsedTime: PropTypes.number,
    nextSong: PropTypes.func,
    seekAndResumeSong: PropTypes.func,
    previousSong: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
  }

  static defaultProps = {
    activeSong: {},
    isPlaying: false,
    elapsedTime: 0,
    nextSong: () => {},
    seekAndResumeSong: () => {},
    previousSong: () => {},
    resumeSong: () => {},
    pauseSong: () => {},
  }

  constructor(props) {
    super(props);

    this.togglePlay = this.togglePlay.bind(this);
    this.onSlidingStart = this.onSlidingStart.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.onNext = this.onNext.bind(this);

    this.state = {
      isPlaying: props.isPlaying,
      sliding: false,
      activeSong: props.activeSong,
      elapsedTime: props.elapsedTime,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  onSlidingStart() {
    this.props.pauseSong();
  }

  onNext() {
    this.props.nextSong();
  }

  onPrevious() {
    this.props.previousSong();
  }

  seekToTime(elapsedTime) {
    this.props.seekAndResumeSong({ payload: { elapsedTime } });
  }

  togglePlay() {
    if (this.state.isPlaying) {
      this.props.pauseSong();
    } else {
      this.props.resumeSong();
    }
  }

  render() {
    let playButton;
    if (this.state.isPlaying) {
      playButton = <Icon name="pause-circle-outline" size={60} color="#FF4081" />;
    } else {
      playButton = <Icon name="play-circle-outline" size={60} color="#FF4081" />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <Slider
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor="#FF4081"
            maximumTrackTintColor="#FAFAFA"
            style={styles.slider}
            step={1}
            value={this.state.elapsedTime}
            maximumValue={this.state.activeSong.duration}
            onSlidingStart={this.onSlidingStart}
            onSlidingComplete={this.seekToTime}
            onValueChange={(val) => { this.setState({ elapsedTime: val }); }}
          />
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formattedTime(this.state.elapsedTime)}</Text>
          <Text style={styles.timer}>
            {formattedTime(this.state.activeSong.duration - this.state.elapsedTime)}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{this.state.activeSong.title}</Text>
          <Text style={styles.info}>{this.state.activeSong.artist}</Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.skipPrevious}>
            <TouchableOpacity style={styles.controlButton} onPress={this.onPrevious}>
              <Icon style={styles.skip} name="skip-previous" size={40} color="#FF4081" />
            </TouchableOpacity>
          </View>
          <View style={styles.play}>
            <TouchableOpacity style={styles.controlButton} onPress={this.togglePlay}>
              { playButton }
            </TouchableOpacity>
          </View>
          <View style={styles.skipNext}>
            <TouchableOpacity style={styles.controlButton} onPress={this.onNext}>
              <Icon style={styles.skip} name="skip-next" size={40} color="#FF4081" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function withLeadingZero(time) {
  let formatted;
  if (time < 10) {
    formatted = `0${time}`;
  } else {
    formatted = `${time}`;
  }
  return formatted;
}

function formattedTime(timeInSeconds) {
  const totalSeconds = Math.floor(timeInSeconds);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = totalSeconds - (minutes * 60);
  let formatted;
  if (isNaN(minutes) || isNaN(seconds)) {
    formatted = '';
  } else {
    formatted = `${minutes}:${withLeadingZero(seconds.toFixed(0))}`;
  }
  return formatted;
}

const mapStateToProps = state => ({
  activeSong: getActiveSong(state),
  isPlaying: getIsPlaying(state),
  elapsedTime: getElapsedTime(state),
});

export default connect(
  mapStateToProps,
  { nextSong, previousSong, resumeSong, pauseSong, seekAndResumeSong },
)(Player);
