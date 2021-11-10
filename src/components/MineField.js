import React from "react";
import { View, StyleSheet } from "react-native";
import Field from "./Field";

export default (props) => {
  const rows = props.board.map((row, r) => {
    const columns = row.map((fields, c) => {
      return (
        <Field
          {...fields}
          key={c}
          onOpen={() => props.onOpenField(r, c)}
          onSelectField={() => props.onSelectField(r, c)}
        />
      );
    });
    return (
      <View key={r} style={{ flexDirection: "row" }}>
        {columns}
      </View>
    );
  });
  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
  },
});
