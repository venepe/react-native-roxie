import React, { Component } from 'react';
import {
  Navigator,
  View,
} from 'react-native';
import Main from '../../components/Main';
import styles from './styles';

class App extends Component {

  static renderScene(route, navigator) {
    const RouteComponent = route.component;

    return (
      <View style={styles.container}>
        <RouteComponent navigator={navigator} route={route} />
      </View>
    );
  }

  render() {
    return (
      <Navigator
        renderScene={App.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        initialRoute={{
          component: Main,
        }}
      />
    );
  }
}

export default App;
