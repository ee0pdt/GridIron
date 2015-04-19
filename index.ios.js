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

var GridIron = React.createClass({
  mixins: [TimerMixin],

  handleTouchStart(event: Object) {
    var gridModel = this.state.gridModel;

    var x = event.nativeEvent.pageX;
    var y = event.nativeEvent.pageY;

    this.startColumn = Math.floor(x / gridModel.jewelSize) - 1;
    this.startRow = Math.floor(y / gridModel.jewelSize) - 1;
  },

  handleTouchEnd(event: Object) {
    var gridModel = this.state.gridModel;

    var x = event.nativeEvent.pageX;
    var y = event.nativeEvent.pageY;

    var column = Math.floor(x / gridModel.jewelSize) - 1;
    var row = Math.floor(y / gridModel.jewelSize) - 1;

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

      console.log('('+this.startColumn+','+this.startRow+')', '('+column+','+row+')', diff);
      
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
    return {
      score: 0,
      loaded: false,
    };
  },

  componentDidMount () {
    var viewport = Viewport.getDimensions(this._handleViewportChange);
    var grid = new GameGridModel(9, 9, 4);

    this.setState({
      loaded: true,
      gridModel: grid,
    });
  },

  _handleViewportChange (viewport) {
    console.log(viewport);
    this.setState({
      viewport: viewport,
    });
  },

  render () {
    return (
      <View style={styles.container} 
            onTouchStart={(event) => this.handleTouchStart(event)}
            onTouchEnd={(event) => this.handleTouchEnd(event)} >
        <GameGrid gridModel={this.state.gridModel} viewport={this.state.viewport}></GameGrid>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#434343',
    position: 'absolute',
    width: 270,
    height: 270,
  }
});

AppRegistry.registerComponent('GridIron', () => GridIron);
