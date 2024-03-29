import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ViewServiceSubPage } from "./SubScreens/ViewServiceSubPage.js";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

/**
 * @author
 * @function ViewService
 **/
export const ViewService = ({ navigation, route }) => {
  const service = route.params.service;

  console.log("service details", service);
  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}
      <TopBar title="Service Details" />
      <ViewServiceSubPage service={service} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
