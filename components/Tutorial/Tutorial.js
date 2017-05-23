import React, { Component, PropTypes } from 'react';
import {
  Linking,
  Platform,
  View,
  WebView,
 } from 'react-native';
import WRNavigationBar from '../WRNavigationBar';
import styles from './styles';

export default class Tutorial extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      pop: PropTypes.func,
    }),
  }

  static defaultProps = {
    navigator: {
      pop: () => {},
    },
  }

  static getUrl() {
    if (Platform.OS === 'android') {
      return 'https://www.cnet.com/how-to/how-to-manually-transfer-music-to-your-androids-sd-card';
    }
    return 'https://support.apple.com/kb/PH19463?locale=en_US';
  }

  render() {
    const uri = Tutorial.getUrl();
    const navigator = this.props.navigator;
    return (
      <View style={styles.container}>
        <WRNavigationBar
          title={'Tutorial'}
          leftButton={{
            title: 'Back',
            handler: () => {
              navigator.pop();
            },
          }}
          rightButton={{
            title: '',
            handler: null,
          }}
        />
        <WebView
          ref={(ref) => { this.webview = ref; }}
          source={{ uri }}
          onNavigationStateChange={(event) => {
            if (event.url !== uri) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
      </View>
    );
  }
}
