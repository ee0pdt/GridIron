/**
 * @providesModule JewelModel
 * @flow
 */
'use strict';

var JewelModel = function(data) {
  this.row = data.row;
  this.column = data.column;
  this.size = data.size || 30;
  this.type = data.type;
};

JewelModel.prototype.getPosition = function() {
  return [
    (this.column * 30) + 15,
    (this.row * 30) + 15,
  ];
};

JewelModel.prototype.getRandomType = function(types) {
  return Math.floor(Math.random() * types) + 1;
};

module.exports = JewelModel;