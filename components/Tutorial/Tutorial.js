import React, { Component, PropTypes } from 'react';
import {
  Linking,
  Platform,
  View,
  WebView,
 } from 'react-native';
import NavigationBar from 'react-native-navbar';
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
        <NavigationBar
          title={{ title: 'Tutorial', tintColor: '#F5F5F5' }}
          tintColor="#000D11"
          statusBar={{ style: 'light-content' }}
          leftButton={{
            title: 'Back',
            handler: () => {
              navigator.pop();
            },
            tintColor: '#F5F5F5',
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
