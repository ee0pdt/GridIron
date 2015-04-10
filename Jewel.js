/**
 * Grid for gameplay
 */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animation,
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
    opacity: 0,
  };
}

var Jewel = React.createClass({
  componentDidMount: function () {
    Animation.startAnimation(this.refs['this'], 400, 0, 'linear', {opacity: 1});
  },
  _onPressButton: function() {
    var type = this.props.type;
    var jewels = [];

    var jewel = {
      row: this.props.row,
      column: this.props.column,
      type: this.props.type,
    };

    this.props.jewelPressCallback(jewel);
  },
  render: function() {
    return (
      <View ref='this'>
        <TouchableHighlight onPress={this._onPressButton}>
          <View style={jewelStyle(this.props.type)}></View>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Jewel;
