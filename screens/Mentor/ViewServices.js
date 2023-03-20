import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ViewServicesSubPage } from "./SubScreens/ViewServicesSubPage.js";

/**
 * @author
 * @function ViewServices
 **/
export const ViewServices = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
      <ViewServicesSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
