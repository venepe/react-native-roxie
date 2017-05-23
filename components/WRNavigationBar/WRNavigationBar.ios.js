/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';

import NavigationBar from 'react-native-navbar';

export default class WRNavigationBar extends Component {

  static propTypes = {
    title: PropTypes.string,
    leftButton: PropTypes.shape({
      title: PropTypes.string,
      handler: PropTypes.func,
    }),
    rightButton: PropTypes.shape({
      title: PropTypes.string,
      handler: PropTypes.func,
    }),
  }

  static defaultProps = {
    title: '',
    leftButton: {},
    rightButton: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      leftButton: props.leftButton,
      rightButton: props.rightButton,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  render() {
    return (
      <NavigationBar
        title={{ title: this.state.title, tintColor: '#F5F5F5' }}
        tintColor="#000D11"
        statusBar={{ style: 'light-content' }}
        leftButton={{
          title: this.state.leftButton.title,
          handler: () => {
            this.state.leftButton.handler();
          },
          tintColor: '#F5F5F5',
        }}
        rightButton={{
          title: this.state.rightButton.title,
          handler: () => {
            this.state.rightButton.handler();
          },
          tintColor: '#F5F5F5',
        }}
      />
    );
  }
}
