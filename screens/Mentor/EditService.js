import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EditServiceSubPage } from "./SubScreens/EditServiceSubPage.js";

import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/Common/TopBar";

/**
 * @author
 * @function EditService
 **/
export const EditService = ({ navigation, route }) => {
  const service = route.params.service;

  return (
    <SafeAreaView style={styles.container}>
      {/* <MakeAppointmentSubPage id={id} name={name} role={role} image={image} /> */}

      <TopBar title="Edit Service" />
      <EditServiceSubPage service={service} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
