/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var GameGrid = require('./GameGrid');
var GameGridModel = require('./GameGridModel');
var TimerMixin = require('react-timer-mixin');
var Viewport = require('react-native-viewport');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = React;

var gridStore;

function containerStyle(viewport) {
  console.log(viewport);
  
  if(!viewport) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      marginTop: 0,
      backgroundColor: '#434343',
      position: 'absolute',
    };
  }

  var gridSize = viewport.width < viewport.height ? viewport.width : viewport.height;

  return {
    width: gridSize,
    height: gridSize,
    top: 0,
    left: 0,
    marginTop: 0,
    backgroundColor: '#434343',
    position: 'absolute',
  };
}

var GridIron = React.createClass({
  mixins: [TimerMixin],

  handleTouchStart(event: Object) {
    var gridModel = this.state.gridModel;

    var x = event.nativeEvent.pageX;
    var y = event.nativeEvent.pageY;

    this.startColumn = Math.floor(x / gridModel.jewelSize);
    this.startRow = Math.floor(y / gridModel.jewelSize);
  },

  handleTouchEnd(event: Object) {
    var gridModel = this.state.gridModel;

    var x = event.nativeEvent.pageX;
    var y = event.nativeEvent.pageY;

    var column = Math.floor(x / gridModel.jewelSize);
    var row = Math.floor(y / gridModel.jewelSize);

    console.log(x, y, gridModel.jewelSize, column, row);

    if(column === this.startColumn && row === this.startRow) {
      var jewel = gridModel.getJewel(row, column);
      var matches = [gridModel.mapToIndex(row, column)];

      matches = gridModel.findMatches(jewel, matches);

      matches.sort(function(a, b) {
        return a - b;
      });
      
      if(matches.length >2) {
        matches.forEach((index) => {
          jewel = gridModel.getJewelAtIndex(index);
          
          gridModel.bubbleJewel(jewel, index);
          jewel.type = Math.floor(Math.random() * this.state.gridModel.types) + 1;
        });
      }
    } else {
      var diff = Math.abs(this.startRow - row) + Math.abs(this.startColumn - column);

      var jewelA = gridModel.getJewel(row, column);
      var jewelB = gridModel.getJewel(this.startRow, this.startColumn);
      
      if(diff > 1) {
        return 0;
      }

      if(jewelA && jewelB && jewelA.type !== 0 && jewelB.type !== 0) {
        gridModel.swapJewels(jewelA, jewelB);
      }
    }

    this.forceUpdate();
  },

  getInitialState () {
    Viewport.getDimensions(this._handleViewportChange);

    return {
      score: 0,
      loaded: false,
    };
  },

  componentDidMount () {
    this.setState({
      loaded: false,
    });
  },

  _handleViewportChange (viewport) {
    console.log('_handleViewportChange', viewport);
    var gridSize = viewport.width < viewport.height ? viewport.width : viewport.height;
    var grid = new GameGridModel(9, 9, 4, gridSize);
    
    this.setState({
      viewport: viewport,
      loaded: true,
      gridModel: grid,
    });
  },

  render () {
    return (
      <View style={containerStyle(this.state.viewport)} 
            onTouchStart={(event) => this.handleTouchStart(event)}
            onTouchEnd={(event) => this.handleTouchEnd(event)} >
        <GameGrid gridModel={this.state.gridModel} viewport={this.state.viewport}></GameGrid>
      </View>
    );
  },
});

AppRegistry.registerComponent('GridIron', () => GridIron);
