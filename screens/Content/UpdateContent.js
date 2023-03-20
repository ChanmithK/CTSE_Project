import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UpdateContentSubPage from "./SubScreens/UpdateContentSubPage";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

const UpdateContent = ({ navigation, route }) => {
  const data = route.params.content;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Update Content" />
      <UpdateContentSubPage content={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default UpdateContent;
