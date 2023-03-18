import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import React from "react";
import ViewAppointmentListSub from "./SubScreens/viewAppointmentListSub";

const ViewAppointmentList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ViewAppointmentListSub />
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

export default ViewAppointmentList;
