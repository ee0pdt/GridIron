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
  // _matchType: function(row, column, type) {
  //   if(gridStore[row] && gridStore[row][column] && gridStore[row][column] === type) {
  //     return 1;
  //   }
  //   return false;
  // },
  // _mapToIndex: function(row, column) {
  //   return (row * gridStore.length) + column;
  // },
  // _findMatches: function(jewel, matches) {
  //   var row, column, index;

  //   // Try North
  //   row = jewel.row - 1;
  //   column = jewel.column;

  //   if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
  //     matches[this._mapToIndex(row, column)] = 1;
  //     matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
  //   }

  //   // Try East
  //   row = jewel.row;
  //   column = jewel.column + 1;

  //   if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
  //     matches[this._mapToIndex(row, column)] = 1;
  //     matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
  //   }

  //   // Try South
  //   row = jewel.row + 1;
  //   column = jewel.column;

  //   if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
  //     matches[this._mapToIndex(row, column)] = 1;
  //     matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
  //   }

  //   // Try West
  //   row = jewel.row;
  //   column = jewel.column -1;

  //   if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
  //     matches[this._mapToIndex(row, column)] = 1;
  //     matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
  //   }

  //   return matches;
  // },
  // _mapIndex: function(index) {
  //   var row, column;

  //   column = gridStore.length % index;
  //   row = index-column / gridStore.length;

  //   return {
  //     row: row,
  //     column: column
  //   };
  // },
  _onPressButton: function() {
    var type = this.props.type;
    var jewels = [];

    var jewel = {
      row: this.props.row,
      column: this.props.column,
      type: this.props.type,
    };

    this.props.jewelPressCallback(jewel);

    // jewels = this._findMatches(jewel, jewels);
    // console.log('matches '+jewels);

    // for (var i = 0; i < jewels.length; i++) {
    //   jewel[i] = this._mapIndex(jewels[i]);
    //   gridStore[jewel.row][jewel.column] = 0;
    // }
  },
  render: function() {
    return (
      <TouchableHighlight onPress={this._onPressButton}>
        <View style={jewelStyle(this.props.type)}></View>
      </TouchableHighlight>
    );
  }
});

module.exports = Jewel;
