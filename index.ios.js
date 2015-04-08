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

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// var GIJewel = React.createClass({
//   _matchType: function(row, column, type) {
//     if(gridStore[row] && gridStore[row][column] && gridStore[row][column] === type) {
//       return 1;
//     }
//     return false;
//   },
//   _mapToIndex: function(row, column) {
//     return (row * gridStore.length) + column;
//   },
//   _findMatches: function(jewel, matches) {
//     var row, column, index;

//     // Try North
//     row = jewel.row - 1;
//     column = jewel.column;

//     if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
//       matches[this._mapToIndex(row, column)] = 1;
//       matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
//     }

//     // Try East
//     row = jewel.row;
//     column = jewel.column + 1;

//     if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
//       matches[this._mapToIndex(row, column)] = 1;
//       matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
//     }

//     // Try South
//     row = jewel.row + 1;
//     column = jewel.column;

//     if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
//       matches[this._mapToIndex(row, column)] = 1;
//       matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
//     }

//     // Try West
//     row = jewel.row;
//     column = jewel.column -1;

//     if(!matches[this._mapToIndex(row, column)] && this._matchType(row, column, jewel.type)) {
//       matches[this._mapToIndex(row, column)] = 1;
//       matches = this._findMatches({row: row, column: column, type: jewel.type}, matches);
//     }

//     return matches;
//   },
//   _mapIndex: function(index) {
//     var row, column;

//     column = gridStore.length % index;
//     row = index-column / gridStore.length;

//     return {
//       row: row,
//       column: column
//     };
//   },
//   _onPressButton: function() {
//     var type = this.props.type;
//     var jewels = [];

//     var jewel = {
//       row: this.props.row,
//       column: this.props.column,
//       type: this.props.type,
//     };

//     jewels = this._findMatches(jewel, jewels);
//     console.log('matches '+jewels);

//     for (var i = 0; i < jewels.length; i++) {
//       jewel[i] = this._mapIndex(jewels[i]);
//       gridStore[jewel.row][jewel.column] = 0;
//     }
//   },
//   render: function() {
//     return (
//       <TouchableHighlight onPress={this._onPressButton}>
//         <View style={jewelStyle(this.props.type)}></View>
//       </TouchableHighlight>
//     );
//   }
// });

var GIGridRow = React.createClass({
  render: function() {
    var columns =[];
    for (var j = 0; j < this.props.columns.length; j++) {
      columns.push(
        <View style={styles.column}>
          <GIJewel row={this.props.row} column={j} type={this.props.columns[j]}></GIJewel>
        </View>
      );
    }

    return (
      <View style={styles.row}>
        {columns}
      </View>
    );
  }
});

// var GIGrid = React.createClass({
//   render: function() {
//     var rows = [];
//     var columns;

//     for (var i = 0; i < this.props.grid.length; i++) {
//       columns = [];
//       rows.push(<GIGridRow grid={this.props.grid} row={i} columns={this.props.grid[i]}></GIGridRow>)
//     }

//     return (
//       <View style={styles.grid}>
//         {rows}
//       </View>
//     );
//   }
// });

var GridIron = React.createClass({
  getInitialState: function() {
    return {
      grid: [],
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.initGrid(9, 9);
  },

  initGrid: function(rows, cols) {
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

  render: function() {
    return (
      <View class={styles.container}>
        <GameGrid grid={this.state.grid}></GameGrid>
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
