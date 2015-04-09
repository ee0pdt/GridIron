/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var GameGrid = require('./GameGrid');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = React;

var gridStore;

var GridIron = React.createClass({
  getInitialState: function() {
    return {
      grid: [],
      loaded: false,
    };
  },

  componentDidMount: function() {
    this._initGrid(9, 9);
  },

  _initGrid: function(rows, cols) {
    var grid = [];
    var columns;
    for (var r = 0; r < rows; r++) {
      columns = []
      for (var c = 0; c < cols; c++) {
        columns[c] = Math.floor(Math.random() * 4) + 1;
      }
      grid[r] = columns;
    }

    gridStore = grid;

    this.setState({
      grid: gridStore,
      loaded: true,
    });
  },

  _matchType: function(row, column, type) {
    if(gridStore[row] && gridStore[row][column] && gridStore[row][column] === type) {
      return 1;
    }
    return false;
  },
  _mapToIndex: function(row, column) {
    return (row * gridStore.length) + column;
  },
  _findMatches: function(jewel, matches) {
    var row, column, index;

    // Try North
    row = jewel.row - 1;
    column = jewel.column;

    if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
      matches[this._mapToIndex(row, column)] = 1;
      matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
    }

    // Try East
    row = jewel.row;
    column = jewel.column + 1;

    if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
      matches[this._mapToIndex(row, column)] = 1;
      matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
    }

    // Try South
    row = jewel.row + 1;
    column = jewel.column;

    if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
      matches[this._mapToIndex(row, column)] = 1;
      matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
    }

    // Try West
    row = jewel.row;
    column = jewel.column -1;

    if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
      matches[this._mapToIndex(row, column)] = 1;
      matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
    }

    return matches;
  },
  _mapIndex: function(index) {
    var row, column;

    row = Math.floor(index / gridStore.length);
    column = index - (row * 9);

    return {
      row: row,
      column: column
    };
  },
  jewelPressCallback: function(jewel) {
    var jewels = [];
    var temp = this.state.grid;

    jewels = this._findMatches(jewel, jewels);
    console.log('matches '+jewels);

    for (var i = 0; i < jewels.length; i++) {
      if(jewels[i]) {
        jewel = this._mapIndex(i);
        console.log(gridStore);
        console.log(jewel);
        temp[jewel.row][jewel.column] = 0;
      }
    }

    this.setState({
      grid: temp,
      loaded: true,
    });
  },

  render: function() {
    return (
      <View class={styles.container}>
        <GameGrid grid={this.state.grid} jewelPressCallback={this.jewelPressCallback}></GameGrid>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff0000',
    height: 320,
    width: 600,
    padding: 50,
  },
  grid: {
    justifyContent: 'center',
    backgroundColor: '#0000ff',
    width: 320,
    height: 320,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#9E9E9E',
  },
  column: {
    flex: 1,
    backgroundColor: '#605E66',
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('GridIron', () => GridIron);
