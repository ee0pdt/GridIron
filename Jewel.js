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
    var jewel = new JewelModel({
                      row: this.props.row,
                      column: this.props.column,
                      type: this.props.type,
                    });

    this.setState({
      jewel: jewel,
      loaded: true,
    });
  },
  componentWillReceiveProps: function(nextProps) {
    var jewel = new JewelModel({
                      row: nextProps.row,
                      column: nextProps.column,
                      type: nextProps.type,
                    });

    this.setState({
      jewel: jewel,
    });
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if(!this.state.jewel.type || this.state.jewel.type !== nextProps.type || this.state.jewel.row !== nextProps.row) {
      return true;
    }
    return false;
  },
  _calculatePosition: function() { 
    if(this.refs['this']){
      AnimationExperimental.startAnimation(
      {
        node: this.refs['this'],
        duration: 500,
        easing: 'easeInOutQuad',
        property: 'position',
        toValue: this.state.jewel.getPosition(),
      });
    }
  },
  render: function() {
    var jewel = this.state.jewel;
    this.setTimeout(
      () => {
        this._calculatePosition();
      },
      10
    );
    return (
      <View ref='this' style={styles.jewelContainer}>
        <View style={jewelStyle(jewel.type)}></View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  jewelContainer: {
    width: 30,
    height: 30,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    width: 30,
    height: 30,
  },
});

module.exports = Jewel;
