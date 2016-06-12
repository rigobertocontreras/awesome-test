'use strict';
import React, { Component } from 'react';
import {Text, TouchableHighlight} from 'react-native';
const styles = require('../styles.js');

class Button extends Component {
  constructor(props) {
    super(props);
    return {
      active: false,
    };
  }
  _onHighlight() {
    this.setState({active: true});
  }
  _onUnhighlight() {
    this.setState({active: false});
  }
  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

module.exports = Button;
