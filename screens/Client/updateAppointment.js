import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UpdateAppointmentsub from "./SubScreens/updateAppointmentSub";

const UpdateAppointment = ({ route }) => {
  const appointmentdata = route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <UpdateAppointmentsub data={appointmentdata} />
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
export default UpdateAppointment;
