/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Player from '../Player';
import { getVibeValue } from '../../reducers';
import { getIndexFromPercent } from '../../utilities';
import styles, { boxStyles } from './styles';

class Display extends Component {

  static propTypes = {
    vibe: PropTypes.number,
    navigator: PropTypes.shape({
      pop: PropTypes.func,
    }),
  }

  static defaultProps = {
    vibe: 0,
    navigator: {
      pop: () => {},
    },
  }

  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);

    this.state = {
      vibe: props.vibe,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vibe) {
      this.setState({ vibe: nextProps.vibe });
    }
  }

  onBack() {
    this.props.navigator.pop();
  }

  render() {
    const index = getIndexFromPercent(this.state.vibe, boxStyles.length);
    const boxStyle = boxStyles[index];

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.superBoxContainer}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={this.onBack}>
              <Icon name="keyboard-arrow-down" size={40} color="#FAFAFA" />
            </TouchableOpacity>
            <View style={styles.boxContainer}>
              <View style={{ ...boxStyle }} />
            </View>
          </View>
        </View>
        <View style={styles.playerContainer}>
          <Player />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  vibe: getVibeValue(state),
});

export default connect(
  mapStateToProps,
)(Display);
