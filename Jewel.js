/**
 * Grid for gameplay
 */
'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var AnimationExperimental = require('AnimationExperimental');
var JewelModel = require('JewelModel');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

function jewelStyle(type) {
  var jewelColor;

  switch(type) {
    case 0:
      jewelColor = '#FF337B';
      break;
    case 1:
      jewelColor = '#C452FF';
      break;
    case 2:
      jewelColor = '#FF7309';
      break;
    case 3:
      jewelColor = '#2CFF38';
      break;
    default:
      jewelColor = '#287DFF';
  }
  return {
    borderRadius: 15,
    backgroundColor: jewelColor,
    width: 30,
    height: 30,
    borderColor: 'rgba(0,0,0,0.7)',
  };
}

var Jewel = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    return {
      jewel: {},
      loaded: false,
    };
  },
  componentDidMount: function () {
    var jewel = new JewelModel(this.props.row, this.props.column, this.props.type);
    this.setState({
      jewel: jewel,
      loaded: true,
    });

    this.setTimeout(
      () => {
        this._calculatePosition();
      },
      10
    );
  },
  _onPressButton: function() {
    this.props.jewelPressCallback(this.state.jewel);
  },
  _calculatePosition: function() {
    var pos = [
      (this.state.jewel.column * 30) + 15,
      (this.state.jewel.row * 30) + 15,
    ];

    if(this.refs['this']){
      AnimationExperimental.startAnimation(
      {
        node: this.refs['this'],
        duration: 1000,
        easing: 'easeInOutQuad',
        property: 'position',
        toValue: pos,
      });
    }
  },
  render: function() {
    return (
      <View ref='this' style={styles.jewelContainer}>
        <TouchableHighlight style={styles.button} onPress={this._onPressButton}>
          <View style={jewelStyle(this.props.type)} onPress={this._onPressButton}></View>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  jewelContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  button: {
    width: 30,
    height: 30,
  },
});

module.exports = Jewel;
