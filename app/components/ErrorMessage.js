import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ErrorMessage({ message }) {
  return (
    <View style={styles.fill}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
