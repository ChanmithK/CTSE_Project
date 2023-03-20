import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewContentListSubPage from "./SubScreens/ViewContentListSubPage";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewContentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewContentListSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewContentList;
