import { View, StyleSheet } from "react-native";
import React from "react";
import ViewContentSubPage from "./SubScreens/ViewContentSubPage";
import TopBar from "../../components/Common/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewContent = ({ navigation, route }) => {
  const data = route.params.data;
  const isAuthor = route.params.isAuthor;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="" />
      <ViewContentSubPage content={data} isAuthor={isAuthor} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewContent;
