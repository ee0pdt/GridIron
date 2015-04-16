/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var GameGrid = require('./GameGrid');
var GameGridModel = require('./GameGridModel');

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
  handleTouchStart(event: Object) {
    this.startX = event.nativeEvent.pageX;
    this.startY = event.nativeEvent.pageY;
  },

  handleTouchEnd(event: Object) {
    var x = event.nativeEvent.pageX;
    var y = event.nativeEvent.pageY;

    var deltaX = x - this.startX;
    var deltaY = y - this.startY;

    var column = Math.floor(x / this.state.gridModel.jewelSize) - 1;
    var row = Math.floor(y / this.state.gridModel.jewelSize) - 1;

    var jewel = this.state.gridModel.getJewel(row, column);
    var matches = [this.state.gridModel.mapToIndex(row, column)];

    matches = this.state.gridModel.findMatches(jewel, matches);
    
    var temp = this.state.gridModel;
    
    matches.forEach((match, index, length) => {
      jewel = this.state.gridModel.getJewelAtIndex(match);
      console.log(jewel);
      temp.jewels[match].row = 10;
      temp.jewels[match].column = 10;
    });

    this.setState({
      gridModel: temp,
    });
  },

  getInitialState () {
    var grid = new GameGridModel(9, 9, 4);

    return {
      gridModel: grid,
      score: 0,
      loaded: false,
    };
  },

  componentDidMount () {
    this.setState({
      loaded: true,
    });
  },

  render () {
    return (
      <View style={styles.container} 
            onTouchStart={(event) => this.handleTouchStart(event)}
            onTouchEnd={(event) => this.handleTouchEnd(event)} >
        <GameGrid gridModel={this.state.gridModel} ></GameGrid>
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
