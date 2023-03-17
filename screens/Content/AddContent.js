import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AddContentSubPage from "./SubScreens/AddContentSubPage";
import { SafeAreaView } from "react-native-safe-area-context";

const AddContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AddContentSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default AddContent;
