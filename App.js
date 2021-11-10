import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import params from "./src/params";
import MineField from "./src/components/MineField";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from "./src/functions";
import Field from "./src/components/Field";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Perdeu burrao");
    }

    if (won) {
      Alert.alert("Ganhoooooou");
    }

    this.setState({ board, lost, won });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o campo minado!</Text>
        <Text style={styles.instructions}>
          Tamanho da grade: {params.getRowsAmount()} x{" "}
          {params.getColumnsAmount()}
        </Text>
        <View styles={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
          {/* <Field /> */}
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  welcome: {
    textAlign: "center",
    fontSize: 20,
  },
});
