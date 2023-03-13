import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function ViewServiceSubPage
 **/
export const ViewServiceSubPage = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>ViewServiceSubPage</Text>
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
