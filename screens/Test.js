import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Test
 **/
export const Test = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Test1</Text>

      <Text>Praveen</Text>
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
