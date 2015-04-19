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
  getInitialState () {
    return {
      gridModel: null,
      loaded: false,
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      gridModel: nextProps.gridModel,
    });
  },
  _renderJewels: function() {
    if(!this.state.gridModel) {
      return null;
    }

    var jewelComponents =[];
    var jewels = this.state.gridModel.jewels;
    var grid = this.state.gridModel.grid;

    for (var j = 0; j < jewels.length; j++) {
      jewelComponents.push(
        <Jewel row={jewels[j].row} column={jewels[j].column} type={jewels[j].type}></Jewel>
      );
    }

    return (
      {jewelComponents}
    );
  },
  render: function () {
    var jewels = this._renderJewels();
    return (
      <View style={styles.grid}>
        {jewels}
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
