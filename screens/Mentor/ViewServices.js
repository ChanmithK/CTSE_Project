import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ViewServicesSubPage } from "./SubScreens/ViewServicesSubPage.js";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

/**
 * @author
 * @function ViewServices
 **/
export const ViewServices = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
      <TopBar title="View Services" />
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
