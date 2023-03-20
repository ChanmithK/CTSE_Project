import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ViewMentorsServicesSubPage } from "./SubScreens/ViewMentorsServicesSubPage";

/**
 * @author
 * @function ViewMentorsServices
 **/
export const ViewMentorsServices = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
      <ViewMentorsServicesSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});