import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Test2
 **/
export const Test2 = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Test2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
