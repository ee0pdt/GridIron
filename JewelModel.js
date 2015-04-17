/**
 * @providesModule JewelModel
 * @flow
 */
'use strict';

var JewelModel = function(data) {
  this.row = data.row;
  this.column = data.column;
  this.type = data.type;
  this.size = data.size || 30;
};

JewelModel.prototype.getPosition = function() {
  return [
    (this.column * 30) + 15,
    (this.row * 30) + 15,
  ];
};

module.exports = JewelModel;