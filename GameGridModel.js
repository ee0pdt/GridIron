/**
 * @providesModule GameGridModel
 * @flow
 */
'use strict';

var GameGridModel = function(rows, columns, types) {
  this.rows = rows || 9;
  this.columns = columns || 9;
  this.types = types || 4;
  this.jewels = [];
  this.init();
};

// Create a grid full of random jewel types
GameGridModel.prototype.init = function () {
  var data = [];
  var columns;
  var jewels = []

  for (var r = 0; r < this.rows; r++) {
    columns = [];
    for (var c = 0; c < this.columns; c++) {
      columns[c] = Math.floor(Math.random() * 4) + 1;
      jewels.push({
        column: c,
        row: r,
        type: columns[c]
      });
    }
    data[r] = columns;
  }
  this.jewels = jewels;
  this.grid = data;
};

// Check if given type matches the one at the given row and column
GameGridModel.prototype.matchType = function(row, column, type) {
  if(this.grid[row] && this.grid[row][column] && this.grid[row][column] === type) {
    return 1;
  }
  return false;
};

// Convert row and columns to cell index
GameGridModel.prototype.mapToIndex = function(row, column) {
  return (row * this.grid.length) + column;
};

// Do a recursive search to find ajacent matching jewels
GameGridModel.prototype.findMatches = function(jewel, matches) {
  var row, column;

  // Try North
  row = jewel.row - 1;
  column = jewel.column;

  if(!matches[this.mapToIndex(row, column)] && this.matchType(row, column, jewel.type)) {
    matches[this.mapToIndex(row, column)] = 1;
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  // Try East
  row = jewel.row;
  column = jewel.column + 1;

  if(!matches[this.mapToIndex(row, column)] && this.matchType(row, column, jewel.type)) {
    matches[this.mapToIndex(row, column)] = 1;
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  // Try South
  row = jewel.row + 1;
  column = jewel.column;

  if(!matches[this.mapToIndex(row, column)] && this.matchType(row, column, jewel.type)) {
    matches[this.mapToIndex(row, column)] = 1;
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  // Try West
  row = jewel.row;
  column = jewel.column -1;

  if(!matches[this.mapToIndex(row, column)] && this.matchType(row, column, jewel.type)) {
    matches[this.mapToIndex(row, column)] = 1;
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  return matches;
};

// Map cell index to row and colum number
GameGridModel.prototype.mapIndex = function(index) {
  var row, column;

  row = Math.floor(index / this.grid.length);
  column = index - (row * 9);

  return {
    row: row,
    column: column
  };
};

// @todo rewrite this function
GameGridModel.prototype.dropJewelsInColumn = function(grid, jewel) {
  var temp = grid;

  for (var i = jewel.row; i >= 0; i--) {
    temp[i][jewel.column] = grid[i-1] ? grid[i-1][jewel.column] : Math.floor(Math.random() * 4) + 1;
  }

  return grid;
};

GameGridModel.prototype.jewelPressCallback = function(jewel) {
  var jewels = [];
  var temp = this.state.grid;

  jewels = this.findMatches(jewel, jewels);

  function add(a, b) {
    return a + b;
  }

  var total = jewels.reduce(add, 0);

  if(total >= 3) {
    for (var i = 0; i < jewels.length; i++) {
      if(jewels[i]) {
        jewel = this.mapIndex(i);
        temp = this.dropJewelsInColumn(temp, jewel);
      }
    }
  }

  this.grid = temp;
},

module.exports = GameGridModel;