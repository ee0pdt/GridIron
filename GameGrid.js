/**
 * Grid for gameplay
 */
'use strict';

var React = require('react-native');
var Jewel = require('./Jewel');

var {
  StyleSheet,
  Text,
  View,
} = React;

var GameGrid = React.createClass({
  _renderRow: function(grid, row, columns) {
    var jewels =[];
    for (var j = 0; j < columns.length; j++) {
      jewels.push(
        <View style={styles.column}>
          <Jewel row={row} column={j} type={columns[j]}></Jewel>
        </View>
      );
    }

    return (
      <View style={styles.row}>
        {jewels}
      </View>
    );
  },
  _renderRows: function() {
    var rows = [];
    var columns;

    for (var i = 0; i < this.props.grid.length; i++) {
      columns = [];
      rows.push(this._renderRow(this.props.grid, i, this.props.grid[i]));
    }

    return rows;
  },
  render: function() {
    var rows = this._renderRows();

    return (
      <View style={styles.grid}>
        {rows}
      </View>
    );
  }
});

var styles = StyleSheet.create({
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

module.exports = GameGrid;
