import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AddServiceSubPage } from "./SubScreens/AddServiceSubPage.js";

/**
 * @author
 * @function AddService
 **/
export const AddService = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
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
