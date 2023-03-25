import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CreateAppointmentSub from "./SubScreens/createAppointmentSub";
import TopBar from "../../components/Common/TopBar";

const CreateAppointment = ({ route }) => {
  service = route.params.service;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopBar title={"Create Appointment"} />
        <CreateAppointmentSub service={service} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});
export default CreateAppointment;
