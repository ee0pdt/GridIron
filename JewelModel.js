/**
 * @providesModule JewelModel
 * @flow
 */
'use strict';

var JewelModel = function(data) {
  this.row = data.row;
  this.column = data.column;
  this.width = data.width;
  this.type = data.type;
};

JewelModel.prototype.getPosition = function() {
  return [
    (this.column * this.width) + (this.width / 2),
    (this.row * this.width) + (this.width / 2),
  ];
};

JewelModel.prototype.getRandomType = function(types) {
  return Math.floor(Math.random() * types) + 1;
};

module.exports = JewelModel;