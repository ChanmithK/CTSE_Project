import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BookedAppointmentListSub from "./SubScreens/bookedAppointmentListSub";

const BookedAppointmentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BookedAppointmentListSub />
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
export default BookedAppointmentList;
