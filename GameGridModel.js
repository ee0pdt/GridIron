/**
 * @providesModule GameGridModel
 * @flow
 */
'use strict';

var JewelModel = require('JewelModel');

var GameGridModel = function(rows, columns, types, size) {
  this.rows = rows || 9;
  this.columns = columns || 9;
  this.types = types || 4;
  this.jewelSize = size || 30;
  this.jewels = [];
  this.init();
};

// Create a grid full of random jewel types
GameGridModel.prototype.init = function () {
  var data = [];
  var columns;
  var jewels = [];
  var i = 0;

  for (var r = 0; r < this.rows; r++) {
    columns = [];
    for (var c = 0; c < this.columns; c++) {
      
      jewels[i] = new JewelModel({
        column: c,
        row: r,
        type: Math.floor(Math.random() * this.types) + 1,
        size: this.jewelSize,
      });

      columns[c] = jewels[i];
      i++;
    }
    data[r] = columns;
  }
  this.jewels = jewels;
  this.grid = data;
};

// Check if given type matches the one at the given row and column
GameGridModel.prototype.matchType = function(row, column, jewel) {
  if(this.grid[row] && this.grid[row][column] && this.getType(row, column) === jewel.type) {
    return 1;
  }
  return false;
};

// Get type of jewel at given grid position
GameGridModel.prototype.getType = function(row, column) {
  return this.getJewel(row, column).type;
};

// Get jewel at given grid position
GameGridModel.prototype.getJewel = function(row, column) {
  return this.grid[row][column];
};

// Get jewel at given grid position
GameGridModel.prototype.getJewelAtIndex = function(index) {
  var point = this.mapIndex(index);
  return this.getJewel(point.row, point.column);
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

  if(matches.indexOf(this.mapToIndex(row, column)) === -1 && this.matchType(row, column, jewel)) {
    matches.push(this.mapToIndex(row, column));
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  // Try East
  row = jewel.row;
  column = jewel.column + 1;

  if(matches.indexOf(this.mapToIndex(row, column)) === -1 && this.matchType(row, column, jewel)) {
    matches.push(this.mapToIndex(row, column));
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  // Try South
  row = jewel.row + 1;
  column = jewel.column;

  if(matches.indexOf(this.mapToIndex(row, column)) === -1 && this.matchType(row, column, jewel)) {
    matches.push(this.mapToIndex(row, column));
    matches = this.findMatches({row: row, column: column, type: jewel.type}, matches);
  }

  // Try West
  row = jewel.row;
  column = jewel.column -1;

  if(matches.indexOf(this.mapToIndex(row, column)) === -1 && this.matchType(row, column, jewel)) {
    matches.push(this.mapToIndex(row, column));
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

// Keep bubbling jewel upwards
GameGridModel.prototype.bubbleJewel = function(jewel) {
  var jewelAbove;

  if(jewel.row > 0) {
    jewelAbove = this.getJewel(jewel.row-1, jewel.column);

    // Swap jewel positions
    jewelAbove.row++;
    jewel.row--;

    // Log new jewels in grid
    this.updateGridWithJewel(jewel);
    this.updateGridWithJewel(jewelAbove);

    // Continue bubbling
    jewel.type = 0;
    this.bubbleJewel(jewel);
  }

  //jewel.type = Math.floor(Math.random() * this.types) + 1;
};

GameGridModel.prototype.swapJewels = function(jewelA, jewelB) {
  var r1, c1, r2, c2;

  console.log(jewelA, jewelB);

  r1 = Math.abs(jewelA.row);
  c1 = Math.abs(jewelA.column);

  r2 = Math.abs(jewelB.row);
  c2 = Math.abs(jewelB.column);

  jewelA.row = r2;
  jewelA.column = c2;

  jewelB.row = r1;
  jewelB.column = c1;

  // Log new jewels in grid
  this.updateGridWithJewel(jewelA);
  this.updateGridWithJewel(jewelB);

  console.log(jewelA, jewelB);
};

// Update grid to reflect jewel change
GameGridModel.prototype.updateGridWithJewel = function(jewel) {
  this.grid[jewel.row][jewel.column] = jewel;
};

module.exports = GameGridModel;