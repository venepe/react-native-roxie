/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { onCapture } from '../../actions';
import styles from './styles';

class Scanner extends Component {
  static propTypes = {
    onCapture: PropTypes.func,
    navigator: PropTypes.shape({
      pop: PropTypes.func,
    }),
  }

  static defaultProps = {
    onCapture: () => {},
    navigator: {
      pop: () => {},
    },
  }

  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);

    this.state = {
      didCapture: false,
    };
  }

  onBarCodeRead(result) {
    if (!this.state.didCapture && result.data && result.data.length > 0) {
      this.setState({
        didCapture: true,
      });
      const data = result.data;
      const payload = JSON.parse(data);
      this.props.onCapture({ payload });
      this.goBack();
    }
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          aspect={Camera.constants.Aspect.fill}
        >
          <View style={styles.container}>
            <View style={styles.box}>
              <Icon name="crop-free" size={300} color="#F5F5F5" />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
              <Icon name="close" size={50} color="#F5F5F5" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

export default connect(
  null,
  { onCapture },
)(Scanner);
