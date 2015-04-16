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
    this.setState({
      jewel: this.props.data,
      loaded: true,
    });

    this.setTimeout(
      () => {
        this._calculatePosition();
      },
      10
    );
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
        <View style={jewelStyle(this.props.data.type)}></View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  jewelContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
  },
  button: {
    width: 30,
    height: 30,
  },
});

module.exports = Jewel;
