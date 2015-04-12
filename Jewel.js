/**
 * Grid for gameplay
 */
'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');

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
  };
}

var Jewel = React.createClass({
  mixins: [TimerMixin],
  componentDidMount: function () {
    this.setTimeout(
      () => {
        Animation.startAnimation(this.refs['this'], 1000, 0, 'easeInOutQuad', {opacity:1});
        this._calculatePosition();
      },
      0
    );
  },
  // componentWillUpdate: function () {
  //   this.setTimeout(
  //     () => {
  //       Animation.startAnimation(this.refs['this'], 1000, 0, 'easeInOutQuad', {position:30});
  //     },
  //     0
  //   );
  // },
  // componentDidUpdate: function () {
  //   this.setTimeout(
  //     () => {
  //       Animation.startAnimation(this.refs['this'], 10, 0, 'easeInOutQuad', {marginTop:0});
  //     },
  //     500
  //   );
  // },
  _onPressButton: function() {
    var type = this.props.type;
    var jewels = [];

    var jewel = {
      row: this.props.row,
      column: this.props.column,
      type: this.props.type,
      position: {

      }
    };

    this.props.jewelPressCallback(jewel);
  },
  _calculatePosition: function() {
    var pos = [
      (this.props.column) * 30,
      (this.props.row) * 30,
    ];

    if(this.refs['this']){
      Animation.startAnimation(this.refs['this'], 100, 0, 'easeInOutQuad', {position: pos});
    }
  },
  render: function() {
    // this._calculatePosition();
    return (
      <View ref='this' style={styles.hiddenFirst}>
        <TouchableHighlight onPress={this._onPressButton}>
          <View style={jewelStyle(this.props.type)}></View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  hiddenFirst: {
    opacity: 0,
  }
});

module.exports = Jewel;
