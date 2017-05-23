/**
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  ToolbarAndroid,
} from 'react-native';

import { toolbarStyles } from './styles';

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

    this.onActionSelected = this.onActionSelected.bind(this);

    this.state = {
      title: props.title,
      leftButton: props.leftButton,
      rightButton: props.rightButton,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  onActionSelected(index) {
    if (index === 0) {
      this.state.leftButton.handler();
    } else if (index === 1) {
      this.state.rightButton.handler();
    }
  }

  getActions() {
    const buttons = ['leftButton', 'rightButton'];
    const actions = [];
    buttons.forEach((key) => {
      if (this.state[key].title) {
        actions.push({
          title: this.state[key].title, show: 'always',
        });
      }
    });
    return actions;
  }

  render() {
    return (
      <ToolbarAndroid
        title={this.state.title}
        titleColor="#F5F5F5"
        style={toolbarStyles}
        actions={this.getActions()}
        onActionSelected={this.onActionSelected}
      />
    );
  }
}
