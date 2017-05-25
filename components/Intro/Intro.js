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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
          <View style={styles.iconContainer}>
            <Icon name="itunes" size={70} color="#FF8A80" style={styles.icon} />
            <Icon name="bluetooth" size={70} color="#FF8A80" style={styles.icon} />
            <Icon name="code-braces" size={70} color="#FF8A80" style={styles.icon} />
          </View>
          <Text style={styles.text}>Add your favorite tunes and build new experiences</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
