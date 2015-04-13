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
        <Jewel row={row} column={j} type={columns[j]} jewelPressCallback={this.props.jewelPressCallback}></Jewel>
      );
    }

    return (
      {jewels}
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
    return (
      <View style={styles.grid}>
        {this._renderRows()}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  grid: {
    position: 'absolute',
    width: 270,
    height: 270,
    top: 0,
    left: 0,
  }
});

module.exports = GameGrid;
