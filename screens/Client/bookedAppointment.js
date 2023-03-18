import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BookedAppointmentSub from "./SubScreens/bookedAppointmentSub";

const BookedAppointment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BookedAppointmentSub />
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
