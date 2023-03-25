import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";
import { ViewMentorServiceSub } from "./SubScreens/viewMentorServiceSub";

export const ViewMentorService = ({ route }) => {
  const service = route.params.service;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={"View Mentor Service"} />
      <ViewMentorServiceSub service={service} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
