import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ViewServiceSubPage } from "./SubScreens/ViewServiceSubPage.js";

/**
 * @author
 * @function ViewService
 **/
export const ViewService = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
      <ViewServiceSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
