import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MyContentListSubPage from "./SubScreens/MyContentListSubPage";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

const MyContentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="My Content List" />
      <MyContentListSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default MyContentList;
