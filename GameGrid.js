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

function gridStyle(viewport) {
  if(viewport) {
    var gridSize = viewport.width < viewport.height ? viewport.width : viewport.height;
    return {
      position: 'absolute',
      width: gridSize,
      height: gridSize,
      top: 0,
      left: 0,
    };
  } else {
    return null;
  }
}

var GameGrid = React.createClass({
  getInitialState () {
    return {
      gridModel: null,
      loaded: false,
      viewport: null,
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      gridModel: nextProps.gridModel,
      viewport: nextProps.viewport,
    });
  },
  _renderJewels: function() {
    if(!this.state.gridModel || !this.state.viewport) {
      return null;
    }

    var jewelComponents =[];
    var jewels = this.state.gridModel.jewels;
    var gridSize = this.props.viewport.width < this.props.viewport.height ? this.props.viewport.width : this.props.viewport.height;
    var jewelWidth = gridSize / this.state.gridModel.grid.length;

    for (var j = 0; j < jewels.length; j++) {
      jewelComponents.push(
        <Jewel row={jewels[j].row} column={jewels[j].column} type={jewels[j].type} width={jewelWidth}></Jewel>
      );
    }

    return (
      {jewelComponents}
    );
  },
  render: function () {
    var jewels = this._renderJewels();
    return (
      <View style={gridStyle(this.state.viewport)}>
        {jewels}
      </View>
    );
  }
});

module.exports = GameGrid;
