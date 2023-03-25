import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BookedAppointmentSub from "./SubScreens/bookedAppointmentSub";
import TopBar from "../../components/Common/TopBar";

const BookedAppointment = ({ route }) => {
  const appointmentdata = route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopBar title={"Booked Appointment"} />
        <BookedAppointmentSub data={appointmentdata} />
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
export default BookedAppointment;
