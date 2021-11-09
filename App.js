import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMinedBoard } from './src/functions';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o campo minado!</Text>
        <Text style={styles.instructions}>Tamanho da grade: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text>
        
        <View styles={styles.board}>
          <MineField board={this.state.board} />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa' 
  },
  welcome: {
    textAlign: 'center',
    fontSize: 20
  }
});
