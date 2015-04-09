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
      score: 0,
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

  _dropJewelsInColumn: function(grid, jewel) {
    var temp = grid;

    for (var i = jewel.row; i >= 0; i--) {
      temp[i][jewel.column] = grid[i-1] ? grid[i-1][jewel.column] : Math.floor(Math.random() * 4) + 1;
    }

    return grid;
  },

  jewelPressCallback: function(jewel) {
    var jewels = [];
    var temp = this.state.grid;

    jewels = this._findMatches(jewel, jewels);

    function add(a, b) {
      return a + b;
    }

    var total = jewels.reduce(add, 0);
    var score = this.state.score;

    if(total > 2) {
      for (var i = 0; i < jewels.length; i++) {
        if(jewels[i]) {
          jewel = this._mapIndex(i);
          temp = this._dropJewelsInColumn(temp, jewel);
        }
      }

      if(total > 5) {
        score = score + 50;
      }
      if(total > 8) {
        score = score + 50;
      }

      score = score + total;
    }

    this.setState({
      grid: temp,
      score: score,
      loaded: true,
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.score}>
          <Text style={styles.scoreText}>Score: {this.state.score}</Text>
        </View>

        <View style={styles.gameGrid}>
          <GameGrid grid={this.state.grid} jewelPressCallback={this.jewelPressCallback}></GameGrid>
        </View>
        
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000000',
    marginTop: 20,
    paddingTop: 30,
  },
  gameGrid: {
    flex: 5,
  },    
  score: {
    flex: 1,
  },
  scoreText: {
    color: '#84B2F9',
    fontSize: 30,
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('GridIron', () => GridIron);
