import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AddServiceSubPage } from "./SubScreens/AddServiceSubPage.js";

import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

/**
 * @author
 * @function AddService
 **/
export const AddService = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
      <TopBar title="Add Service" />
      <AddServiceSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
