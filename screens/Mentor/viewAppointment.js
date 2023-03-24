import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import React from "react";
import ViewAppointmentSub from "./SubScreens/ViewAppointmentSub";

const ViewAppointment = ({ route }) => {
  const appointmentdata = route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ViewAppointmentSub data={appointmentdata} />
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

export default ViewAppointment;
