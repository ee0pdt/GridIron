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

function jewelStyle(jewel) {
  var jewelColor;

  switch(jewel.type) {
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
    borderRadius: jewel.width/2,
    backgroundColor: jewelColor,
    width: jewel.width,
    height: jewel.width,
  };
}

function jewelContainerStyle(width) {
  return {
    width: width,
    height: width,
    top: 0,
    left: 0,
    position: 'absolute',
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
                      width: this.props.width,
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
                      width: this.props.width,
                    });

    this.setState({
      jewel: jewel,
    });
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if(!this.state.jewel.type || this.state.jewel.type !== nextProps.type || this.state.jewel.row !== nextProps.row || this.state.jewel.column !== nextProps.column) {
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

    if(jewel.type===0){
      AnimationExperimental.startAnimation(
      {
        node: this.refs['this'],
        duration: 50,
        easing: 'easeInOutQuad',
        property: 'opacity',
        toValue: 0,
      });
    } else {
      if(this.refs['this']) {
        AnimationExperimental.startAnimation(
        {
          node: this.refs['this'],
          duration: 50,
          easing: 'easeInOutQuad',
          property: 'opacity',
          toValue: 1,
        });
      }
    }

    this.setTimeout(
      () => {
        this._calculatePosition();
      },
      50
    );
    return (
      <View ref='this' style={jewelContainerStyle(jewel.width)}>
        <View style={jewelStyle(jewel)}></View>
      </View>
    );
  },
});

module.exports = Jewel;
