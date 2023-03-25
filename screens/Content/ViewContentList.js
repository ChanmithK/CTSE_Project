import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewContentListSubPage from "./SubScreens/ViewContentListSubPage";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

const ViewContentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Content List" />
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
