/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Navigator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Tutorial from '../Tutorial';
import styles from './styles';

export default class Intro extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  static defaultProps = {
    navigator: {
      push: () => {},
    },
  }

  handler() {
    const navigator = this.props.navigator;
    this.props.navigator.push({
      sceneConfig: Navigator.SceneConfigs.PushFromRight,
      component: Tutorial,
      passProps: { navigator },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.infoContainer} onPress={() => this.handler()}>
          <Icon name="sentiment-very-dissatisfied" size={70} color="#FF8A80" style={styles.icon} />
          <Text style={styles.text}>Add your favorite tunes and build new experiences</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
