import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BoardDetail = ({ board }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{board.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  text: {
    fontSize: 18,
  },
});

export default BoardDetail;
