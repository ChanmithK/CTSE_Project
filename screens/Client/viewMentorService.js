import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewMentorServiceSub } from "./SubScreens/viewMentorServiceSub";

export const ViewMentorService = ({ route }) => {
  const service = route.params.service;

  return (
    <SafeAreaView style={styles.container}>
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
